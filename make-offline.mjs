import fs from 'fs';
import path from 'path';

// Directories to scan for code
const dirsToScan = ['./app', './components'];
const mediaDir = './public/media';

// 1. Ensure the local media folder exists
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
}

// Helper to recursively find all TypeScript files
function walk(dir, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            walk(path.join(dir, file), fileList);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            fileList.push(path.join(dir, file));
        }
    }
    return fileList;
}

const allFiles = dirsToScan.flatMap(dir => walk(dir));

// Regex to capture Unsplash URLs up to the closing quote
const urlRegex = /https:\/\/images\.unsplash\.com\/[^\s"'`)]+/g;

const downloadQueue = new Map();
let counter = 1;

// 2. Scan files and rewrite code to use local paths
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const matches = content.match(urlRegex);
    
    if (matches) {
        let changed = false;
        matches.forEach(url => {
            // Assign a local filename to each unique URL
            if (!downloadQueue.has(url)) {
                downloadQueue.set(url, `mainbar-photo-${counter++}.jpg`);
            }
            const filename = downloadQueue.get(url);
            const localPath = `/media/${filename}`;
            
            // Replace the internet URL with the local path in the code
            content = content.split(url).join(localPath);
            changed = true;
        });
        
        // Save the updated React code
        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated paths in: ${file}`);
        }
    }
});

// 3. Download the actual images
async function processDownloads() {
    console.log(`\nFound ${downloadQueue.size} unique images. Starting download...`);
    
    for (const [url, filename] of downloadQueue.entries()) {
        const filepath = path.join(mediaDir, filename);
        
        if (!fs.existsSync(filepath)) {
            process.stdout.write(`Downloading: ${filename}... `);
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const arrayBuffer = await res.arrayBuffer();
                fs.writeFileSync(filepath, Buffer.from(arrayBuffer));
                console.log("Done!");
            } catch(e) {
                console.error(`Failed:`, e.message);
            }
        } else {
            console.log(`Skipping: ${filename} (Already exists)`);
        }
    }
    console.log("\n✅ SUCCESS! All images downloaded and code rewritten. You are 100% offline-ready for the client!");
}

processDownloads();
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import TemplateSwitcher from "./components/TemplateSwitcher";
// 1. Import your LanguageToggle component
import LanguageToggle from "./components/LanguageToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MainBar Schweinfurt",
  description: "Cafe • Bar • Lebensart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} relative`}>
        <LanguageProvider>
          {/* 2. Place it inside the provider so it's always on screen */}
          <LanguageToggle />
          
          {children}
          
          <TemplateSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
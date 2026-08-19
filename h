[33mcommit f6201284abbcf7ae4fae8d9d5f83fd4fadfe0dfb[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m)[m
Author: rickmaity07-maker <rick.maity07@gmail.com>
Date:   Wed Aug 19 14:03:31 2026 +0200

    feat: add hero background video, fix stacking bug, add custom favicon
    
    Hero section: add silent looping background video (public/media/mainbar-hero.mp4) with a dark scrim overlay for legibility; pause (not unmount) on prefers-reduced-motion; add onError handler for load/codec failures; fix z-index stacking bug where the video was painted behind main's bg-white by adding isolate to the section and switching from -z-10 to z-0.
    
    Favicon: add custom MB monogram (app/icon.svg) matching the hero's ring-stain motif; remove the icons override in layout.tsx metadata that was blocking Next.js's automatic icon.svg detection.

"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ perspective: "2000px" }}>
      <motion.div
        // Pivots on the right edge, swinging in from -90 degrees
        initial={{ rotateY: -90, opacity: 0, transformOrigin: "right" }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="min-h-screen bg-[#fcfbf9]"
      >
        {children}
      </motion.div>
    </div>
  );
}
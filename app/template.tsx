"use client";

import { motion } from "framer-motion";

// template.tsx runs on every navigation (unlike layout.tsx which is persistent).
// This gives us clean enter animations without the AnimatePresence exit-children-swap bug.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

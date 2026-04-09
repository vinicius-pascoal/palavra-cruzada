"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function CrosswordClues({ placedWords }: { placedWords: any[] }) {
  return (
    <div className="minimal-card-soft mb-6 w-full max-w-md text-left space-y-2 text-xs md:text-sm rounded-xl p-4 text-white/90">
      <h2 className="font-semibold text-sm md:text-base text-white/95 mb-2 tracking-normal">Clues:</h2>
      {placedWords.map((w, i) => (
        <AnimatePresence key={i}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={clsx(
              "rounded-md px-2 py-1.5 leading-normal",
              w.revealed ? "text-emerald-300/95" : "text-white/90"
            )}
          >
            <span className="font-semibold text-white/95">
              {w.direction.toUpperCase()} {String.fromCharCode(65 + w.col)}
              {w.row + 1}
            </span>
            : {w.definition}
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}

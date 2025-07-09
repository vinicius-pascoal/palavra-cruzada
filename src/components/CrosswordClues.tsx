"use client";

import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function CrosswordClues({ placedWords }: { placedWords: any[] }) {
  return (
    <div className="mb-6 w-full max-w-md text-left space-y-2 text-sm bg-white/10 p-4 rounded text-white">
      <h2 className="font-semibold text-white mb-2">Clues:</h2>
      {placedWords.map((w, i) => (
        <AnimatePresence key={i}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={clsx("p-1 rounded", w.revealed ? "text-green-400" : "text-white")}
          >
            <span className="font-bold">
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

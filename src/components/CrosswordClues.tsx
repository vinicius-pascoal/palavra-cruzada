"use client";

import clsx from "clsx";

export default function CrosswordClues({ placedWords }: { placedWords: any[] }) {
  return (
    <div className="mb-6 w-full max-w-md text-left space-y-2 text-sm bg-white/10 p-4 rounded text-white">
      <h2 className="font-semibold text-white mb-2">Clues:</h2>
      {placedWords.map((w, i) => (
        <div
          key={i}
          className={clsx("p-1 rounded", w.revealed ? "text-green-400" : "text-white")}
        >
          <span className="font-bold">
            {i + 1}. {w.direction.toUpperCase()} @ {String.fromCharCode(65 + w.col)}
            {w.row + 1}
          </span>
          : {w.definition}
        </div>
      ))}
    </div>
  );
}

"use client";

import clsx from "clsx";

type PlacedWord = {
  word: string;
  definition: string;
  row: number;
  col: number;
  direction: "across" | "down";
  revealed: boolean;
};

type Props = {
  grid: string[][];
  placedWords: PlacedWord[];
};

export default function CrosswordGrid({ grid, placedWords }: Props) {
  const hasLetters = grid.some((row) => row.some((cell) => cell !== ""));

  return (
    <div className="overflow-auto mb-6">
      <div
        className="grid gap-[2px]"
        style={{
          display: "grid",
          gridTemplateColumns: hasLetters
            ? `1.5rem repeat(${grid[0].length}, 2rem)`
            : `repeat(${grid[0].length}, 2rem)`,
          fontFamily: "monospace",
        }}
      >
        {hasLetters && (
          <>
            <div />
            {grid[0].map((_, colIdx) => (
              <div
                key={`col-${colIdx}`}
                className="w-8 h-8 text-center text-xs text-white font-bold"
              >
                {String.fromCharCode(65 + colIdx)}
              </div>
            ))}
          </>
        )}

        {grid.map((row, r) => (
          <>
            {hasLetters && (
              <div
                key={`row-${r}`}
                className="w-6 h-8 text-right pr-[2px] text-xs text-white font-bold"
              >
                {r + 1}
              </div>
            )}
            {row.map((cell, c) => {
              const match = placedWords.some((w) => {
                if (!w.revealed) return false;
                for (let i = 0; i < w.word.length; i++) {
                  if (w.word[i] !== cell) continue;
                  if (
                    (w.direction === "across" && r === w.row && c === w.col + i) ||
                    (w.direction === "down" && c === w.col && r === w.row + i)
                  ) {
                    return true;
                  }
                }
                return false;
              });

              return (
                <div
                  key={`${r}-${c}`}
                  className={clsx(
                    "w-8 h-8 border text-center text-xl uppercase text-black flex items-center justify-center",
                    cell
                      ? match
                        ? "bg-green-200 border-green-500"
                        : "bg-gray-200 border-gray-400"
                      : "bg-transparent border-none"
                  )}
                >
                  {match ? cell : ""}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
}

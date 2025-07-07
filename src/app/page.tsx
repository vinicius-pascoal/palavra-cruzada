'use client';

import { useState } from 'react';
import WordGenerator from '../components/WordGenerator';
import clsx from 'clsx';

type PlacedWord = {
  word: string;
  definition: string;
  row: number;
  col: number;
  direction: 'across' | 'down';
  revealed: boolean;
};

export default function CrosswordPage() {
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);
  const [input, setInput] = useState('');
  const [complete, setComplete] = useState(false);
  const [guessFeedback, setGuessFeedback] = useState('');

  const handleWordsReady = (words: { word: string; definition: string }[]) => {
    const size = 15;
    const newGrid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(''));
    const newPlaced: PlacedWord[] = [];

    const [main, ...rest] = words;
    const startRow = 7;
    const startCol = Math.floor((size - main.word.length) / 2);
    console.log(main.word)

    // Place first word horizontally
    newPlaced.push({
      ...main,
      row: startRow,
      col: startCol,
      direction: 'across',
      revealed: false,
    });
    for (let i = 0; i < main.word.length; i++) {
      newGrid[startRow][startCol + i] = main.word[i];
    }

    // Try to cross other words on shared letters
    rest.forEach(({ word, definition }) => {
      for (let i = 0; i < word.length; i++) {
        console.log(word)
        const letter = word[i];
        const matchIndex = main.word.indexOf(letter);
        if (matchIndex !== -1) {
          const col = startCol + matchIndex;
          const row = startRow - i;
          if (row >= 0 && row + word.length <= size) {
            for (let j = 0; j < word.length; j++) {
              newGrid[row + j][col] = word[j];
            }
            newPlaced.push({
              word,
              definition,
              row,
              col,
              direction: 'down',
              revealed: false,
            });
            return;
          }
        }
      }
    });

    setGrid(newGrid);
    setPlacedWords(newPlaced);
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = input.trim().toLowerCase();
    if (!guess) return;

    let found = false;

    const updated = placedWords.map((w) => {
      if (w.word.toLowerCase() === guess) {
        found = true;
        return { ...w, revealed: true };
      }
      return w;
    });

    setPlacedWords(updated);
    setInput('');

    if (found) {
      setGuessFeedback('✅ Correct!');
    } else {
      setGuessFeedback('❌ Incorrect guess.');
    }

    setTimeout(() => setGuessFeedback(''), 1500);

    if (updated.every((w) => w.revealed)) {
      setComplete(true);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-800 to-gray-600 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-4">🧩 Crossword Game</h1>

      {!grid && <WordGenerator onReady={handleWordsReady} />}

      {grid && (
        <>
          {/* Grid */}
          <div
            className="grid gap-[2px] mb-6"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${grid[0].length}, 2rem)`,
              fontFamily: 'monospace',
            }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                const match = placedWords.some((w) => {
                  if (!w.revealed) return false;
                  for (let i = 0; i < w.word.length; i++) {
                    if (w.word[i] !== cell) continue;

                    if (
                      (w.direction === 'across' && r === w.row && c === w.col + i) ||
                      (w.direction === 'down' && c === w.col && r === w.row + i)
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
                      'w-8 h-8 border text-center text-xl uppercase text-black flex items-center justify-center',
                      cell
                        ? match
                          ? 'bg-green-200 border-green-500'
                          : 'bg-gray-200 border-gray-400'
                        : 'bg-transparent border-none'
                    )}
                  >
                    {match ? cell : ''}
                  </div>
                );
              })
            )}
          </div>

          {/* Clues */}
          <div className="mb-6 w-full max-w-md text-left space-y-2 text-sm bg-white/10 p-4 rounded text-white">
            <h2 className="font-semibold text-white mb-2">Clues:</h2>
            {placedWords.map((w, i) => (
              <div
                key={i}
                className={clsx(
                  'p-1 rounded',
                  w.revealed ? 'text-green-400' : 'text-white'
                )}
              >
                <span className="font-bold">{i + 1}. {w.direction.toUpperCase()}:</span>{' '}
                {w.definition}
              </div>
            ))}
          </div>

          {/* Guess input */}
          <form onSubmit={handleGuess} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border px-3 py-1 rounded text-lg"
              placeholder="Guess full word..."
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>

          {/* Feedback */}
          {guessFeedback && (
            <div className="mt-2 text-white text-lg font-semibold">{guessFeedback}</div>
          )}

          {/* Completion */}
          {complete && (
            <div className="mt-6 flex flex-col items-center space-y-2">
              <div className="text-green-400 font-bold text-xl">
                🎉 You solved the crossword!
              </div>
              <button
                onClick={() => {
                  setGrid(null);
                  setPlacedWords([]);
                  setComplete(false);
                  setInput('');
                }}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                🔁 Play Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

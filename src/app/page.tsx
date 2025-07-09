'use client';

import { useState } from 'react';
import WordGenerator from '../components/WordGenerator';
import CrosswordGrid from '../components/CrosswordGrid';
import CrosswordClues from '../components/CrosswordClues';
import CrosswordInput from '../components/CrosswordInput';
import Background from '../components/Background';

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
    const newGrid = Array(size).fill(null).map(() => Array(size).fill(''));
    const newPlaced: PlacedWord[] = [];

    const [main, ...rest] = words;
    const startRow = 7;
    const startCol = Math.floor((size - main.word.length) / 2);
    console.log(main.word)

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

    rest.forEach(({ word, definition }) => {
      for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        const matchIndex = main.word.indexOf(letter);
        if (matchIndex === -1) continue;

        const col = startCol + matchIndex;
        const row = startRow - i;

        if (row < 0 || row + word.length > size) continue;

        let canPlace = true;
        for (let j = 0; j < word.length; j++) {
          const targetRow = row + j;
          const targetCell = newGrid[targetRow][col];
          if (targetCell && targetCell !== word[j]) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          console.log(word)
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
    setGuessFeedback(found ? '✅ Correct!' : '❌ Incorrect guess.');

    setTimeout(() => setGuessFeedback(''), 1500);
    if (updated.every((w) => w.revealed)) {
      setComplete(true);
    }
  };

  return (
    <Background >
      <h1 className="text-3xl font-bold text-white mb-10">Crossword Game</h1>

      {!grid && <WordGenerator onReady={handleWordsReady} />}

      {grid && (
        <div className='flex items-center space-y-4'>
          <div className='bg-white/10 p-4 rounded  mr-5 shadow-lg shadow-gray-900/50 '>
          <CrosswordGrid grid={grid} placedWords={placedWords}/>
          </div>
          <div>
          <CrosswordClues placedWords={placedWords} />
          <CrosswordInput
            input={input}
            setInput={setInput}
            onSubmit={handleGuess}
            feedback={guessFeedback}
          />
          {complete && (
            <div className="mt-6 flex flex-col items-center space-y-2">
              <div className="text-green-400 font-bold text-xl">
                You solved the crossword!
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
                Play Again
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </Background>
  );
}

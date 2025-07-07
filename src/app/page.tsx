// app/crossword/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import WordGenerator from '../components/WordGenerator';

const Crossword = () => {
  const [word, setWord] = useState<string | null>(null);
  const [definition, setDefinition] = useState<string | null>(null);

  const handleWordReady = (data: { word: string; definition: string }) => {
    setWord(data.word);
    setDefinition(data.definition);
  };

  if (!word || !definition) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <WordGenerator onReady={handleWordReady} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <h1 className="text-3xl font-bold mb-6">🎯 Crossword Challenge</h1>

      <div className="flex gap-2 mb-4">
        {word.split('').map((char, index) => (
          <motion.div
            key={index}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            className={clsx(
              'w-12 h-12 border-2 border-blue-500 text-blue-800 text-2xl font-semibold flex items-center justify-center',
              'bg-white rounded-md shadow-md cursor-pointer'
            )}
          >
            {char.toUpperCase()}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: word.length * 0.1 + 0.3 }}
        className="text-center max-w-lg text-gray-700"
      >
        <p className="text-sm text-gray-400 uppercase mb-1">Clue</p>
        <p className="text-lg italic">"{definition}"</p>
      </motion.div>
    </div>
  );
};

export default Crossword;

'use client';

import { useEffect, useState } from 'react';

type WordDefinition = {
  word: string;
  definition: string;
};

type Props = {
  onReady: (data: WordDefinition[]) => void;
  count?: number;
};

const WordGenerator = ({ onReady, count = 5 }: Props) => {
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      setError('');

      try {
        const res = await fetch(`/api/words?count=${count}`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load words');
        }

        const data = (await res.json()) as { words?: WordDefinition[] };
        const words = data.words ?? [];

        if (words.length === 0) {
          setError('Não foi possível carregar as palavras agora. Atualize a página para tentar novamente.');
          return;
        }

        onReady(words);
      } catch {
        setError('Não foi possível carregar as palavras agora. Atualize a página para tentar novamente.');
      }
    };

    fetchWords();
  }, [onReady, count]);

  if (error) {
    return <div className="text-red-300 text-lg md:text-xl text-center leading-snug">{error}</div>;
  }

  return <div className="text-gray-300 text-lg md:text-xl animate-pulse text-center leading-snug">Loading crossword ...</div>;
};

export default WordGenerator;

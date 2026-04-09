'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

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
      const collected: WordDefinition[] = [];
      const maxAttempts = count * 10;
      let attempts = 0;

      while (collected.length < count && attempts < maxAttempts) {
        attempts += 1;
        try {
          const res = await axios.get('https://random-word-api.herokuapp.com/word?number=1');
          const word = res.data[0];
          try {
            const defRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const defs = defRes.data?.[0]?.meanings?.[0]?.definitions;

            if (defs && defs.length > 0) {
              collected.push({
                word,
                definition: defs[0].definition,
              });
            }
          } catch (error) {
            console.log(`No definition found for word: ${word}`);
          }
        } catch {
          console.error('Error fetching word from API');
        }
      }

      if (collected.length === 0) {
        setError('Não foi possível carregar as palavras agora. Atualize a página para tentar novamente.');
        return;
      }

      onReady(collected);
    };

    fetchWords();
  }, [onReady, count]);

  if (error) {
    return <div className="text-red-300 text-base md:text-lg text-center">{error}</div>;
  }

  return <div className="text-gray-300 text-base md:text-lg animate-pulse text-center">Loading crossword ...</div>;
};

export default WordGenerator;

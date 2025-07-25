'use client';

import { useEffect } from 'react';
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
  useEffect(() => {
    const fetchWords = async () => {
      const collected: WordDefinition[] = [];

      while (collected.length < count) {
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

      onReady(collected);
    };

    fetchWords();
  }, [onReady, count]);

  return <div className="text-gray-300 text-lg animate-pulse text-center">Loading crossword ...</div>;
};

export default WordGenerator;

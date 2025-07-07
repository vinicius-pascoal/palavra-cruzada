// components/WordGenerator.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type WordData = {
  word: string;
  definition: string;
};

type Props = {
  onReady: (data: WordData) => void;
};

const WordGenerator = ({ onReady }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValidWordAndDefinition = async () => {
      setLoading(true);
      let validWord = null;
      let validDefinition = null;

      while (!validWord || !validDefinition) {
        try {
          const wordRes = await axios.get('https://random-word-api.herokuapp.com/word');
          const candidateWord = wordRes.data[0];

          try {
            const defRes = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${candidateWord}`);
            const definitions = defRes.data?.[0]?.meanings?.[0]?.definitions;

            if (definitions && definitions.length > 0) {
              validWord = candidateWord;
              validDefinition = definitions[0].definition;
            } else {
              console.log(`No definition for "${candidateWord}". Retrying...`);
            }
          } catch {
            console.log(`No dictionary entry for "${candidateWord}". Retrying...`);
          }

        } catch (err) {
          console.error('Word API failed.', err);
          break;
        }
      }

      if (validWord && validDefinition) {
        onReady({ word: validWord, definition: validDefinition });
      }

      setLoading(false);
    };

    fetchValidWordAndDefinition();
  }, [onReady]);

  return (
    <div className="text-gray-500 text-lg animate-pulse text-center">
      Loading valid word...
    </div>
  );
};

export default WordGenerator;


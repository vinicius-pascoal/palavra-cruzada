"use client";

import { useEffect, useState } from "react";

// adapatar para servir como contador de pontuacao usando localStorage
// e salvar a pontuacao no localStorage
// e carregar a pontuacao do localStorage quando o componente for montado
// e atualizar a pontuacao quando o usuario acertar uma palavra
const Pontuation = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [wordsFound, setWordsFound] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [lastWord, setLastWord] = useState("");

  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    const storedHighScore = localStorage.getItem("highScore");
    const storedWordsFound = localStorage.getItem("wordsFound");
    const storedTotalWords = localStorage.getItem("totalWords");

    if (storedScore) setScore(Number(storedScore));
    if (storedHighScore) setHighScore(Number(storedHighScore));
    if (storedWordsFound) setWordsFound(Number(storedWordsFound));
    if (storedTotalWords) setTotalWords(Number(storedTotalWords));
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score.toString());
    localStorage.setItem("highScore", highScore.toString());
    localStorage.setItem("wordsFound", wordsFound.toString());
    localStorage.setItem("totalWords", totalWords.toString());
  }, [score, highScore, wordsFound, totalWords]);
  const updateScore = (points: number, word: string) => {
    setScore(prev => prev + points);
    setLastWord(word);
    setWordsFound(prev => prev + 1);
    if (score + points > highScore) {
      setHighScore(score + points);
    }
  };
  const resetScore = () => {
    setScore(0);
    setWordsFound(0);
    setLastWord("");
  };
  const setTotal = (total: number) => {
    setTotalWords(total);
  };
  const getScore = () => {
    return score;
  };
  return (
    <main>
      <div className="flex flex-col items-center justify-center p-4 bg-gray-800 text-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Pontuação</h2>
        <p className="text-lg mb-2">Pontuação Atual: {score}</p>
        <p className="text-lg mb-2">Maior Pontuação: {highScore}</p>
        <p className="text-lg mb-2">Palavras Encontradas: {wordsFound} / {totalWords}</p>
        {lastWord && <p className="text-lg mb-2">Última Palavra: {lastWord}</p>}
        <button
          onClick={() => resetScore()}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Reiniciar Pontuação
        </button>
      </div>
    </main>
  );
};

export default Pontuation;

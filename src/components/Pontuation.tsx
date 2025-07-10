"use client";

import { useEffect, useState } from "react";

const Pontuation = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    if (storedScore) setScore(Number(storedScore));
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score.toString());
  }, [score,]);
  const updateScore = (points: number, word: string) => {
    setScore(prev => prev + points);
  };
  const resetScore = () => {
    setScore(0);
  };
  const getScore = () => {
    return score;
  };
  return (
    <main>
      <div className="bg-white/10 p-4 rounded w-full max-w-md text-center flex justify-center items-center shadow-lg shadow-gray-900/50 mb-5">
        <h2 className="text-lg mb-2">Pontuation: {score}</h2>
      </div>
    </main>
  );
};

export default Pontuation;

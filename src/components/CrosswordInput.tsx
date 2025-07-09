"use client";

import { motion } from "framer-motion";

export default function CrosswordInput({
  input,
  setInput,
  onSubmit,
  feedback,
}: {
  input: string;
  setInput: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  feedback: string;
}) {
  const isError = feedback.includes("Incorrect");

  return (
    <>
      <motion.form
        onSubmit={onSubmit}
        className="flex gap-2"
        animate={isError ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-1 rounded text-lg"
          placeholder="Guess..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </motion.form>
      {feedback && (
        <motion.div
          className="mt-2 text-white text-lg font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {feedback.includes("Correct") ? "🎉 " : "❌ "}{feedback}
        </motion.div>
      )}
    </>
  );
}

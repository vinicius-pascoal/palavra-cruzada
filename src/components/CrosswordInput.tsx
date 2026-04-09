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
    <div className="minimal-card-soft rounded-xl p-4 w-full max-w-md text-center flex flex-col items-center">
      <motion.form
        onSubmit={onSubmit}
        className="flex w-full"
        animate={isError ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-l-lg border border-white/20 border-r-0 bg-white/90 px-3 py-2 text-sm md:text-base text-gray-800 placeholder:text-gray-500 outline-none focus:border-blue-300"
          placeholder="Guess..."
        />
        <button
          type="submit"
          className="rounded-r-lg bg-blue-600 px-4 py-2 text-sm md:text-base text-white transition-colors hover:bg-blue-500"
        >
          Submit
        </button>
      </motion.form>
      {feedback && (
        <motion.div
          style={{ color: feedback.includes("Correct") ? "green" : "red" }}
          className="mt-2 text-sm md:text-base font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {feedback.includes("Correct") ? "✅" : "❌ "}{feedback}
        </motion.div>
      )}
    </div>
  );
}

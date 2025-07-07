"use client";

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
  return (
    <>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-1 rounded text-lg"
          placeholder="Guess full word..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {feedback && <div className="mt-2 text-white text-lg font-semibold">{feedback}</div>}
    </>
  );
}

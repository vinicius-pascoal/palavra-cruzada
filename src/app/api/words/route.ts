import { NextResponse } from "next/server";

type WordDefinition = {
  word: string;
  definition: string;
};

const FALLBACK_WORDS: WordDefinition[] = [
  { word: "planet", definition: "A large celestial body that orbits a star." },
  { word: "forest", definition: "A large area covered chiefly with trees." },
  { word: "river", definition: "A natural stream of water flowing to the sea, a lake, or another river." },
  { word: "puzzle", definition: "A game or problem designed to test ingenuity." },
  { word: "castle", definition: "A large fortified building or set of buildings." },
  { word: "rocket", definition: "A vehicle or device propelled by expelling gases." },
  { word: "bridge", definition: "A structure carrying a path or road across an obstacle." },
  { word: "garden", definition: "A piece of ground used for growing flowers or vegetables." },
];

async function fetchRandomWord(): Promise<string | null> {
  try {
    const res = await fetch("https://random-word-api.herokuapp.com/word?number=1", {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = (await res.json()) as string[];
    const candidate = data?.[0]?.toLowerCase();
    if (!candidate || candidate.length < 3) return null;
    return candidate;
  } catch {
    return null;
  }
}

async function fetchDefinition(word: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    type DictionaryResponse = {
      meanings?: Array<{ definitions?: Array<{ definition?: string }> }>;
    };

    const data = (await res.json()) as DictionaryResponse[];
    return data?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ?? null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedCount = Number(searchParams.get("count") ?? "5");
  const count = Number.isFinite(requestedCount)
    ? Math.min(Math.max(Math.trunc(requestedCount), 1), 10)
    : 5;

  const words: WordDefinition[] = [];
  const seen = new Set<string>();
  const maxAttempts = count * 12;
  let attempts = 0;

  while (words.length < count && attempts < maxAttempts) {
    attempts += 1;

    const word = await fetchRandomWord();
    if (!word || seen.has(word)) continue;

    const definition = await fetchDefinition(word);
    if (!definition) continue;

    seen.add(word);
    words.push({ word, definition });
  }

  if (words.length === 0) {
    const fallback = FALLBACK_WORDS.slice(0, count);
    return NextResponse.json({ words: fallback, source: "fallback" });
  }

  if (words.length < count) {
    for (const item of FALLBACK_WORDS) {
      if (words.length >= count) break;
      if (seen.has(item.word)) continue;
      seen.add(item.word);
      words.push(item);
    }
  }

  return NextResponse.json({ words, source: "remote" });
}

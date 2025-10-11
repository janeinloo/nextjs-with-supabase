"use client";

import { useState } from "react";

export type Movie = {
  title: string;
  genre: string;
  year: number;
  watched: boolean;
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export default function MovieFormClient({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState<number>(2025);
  const [watched, setWatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, genre, year, watched });
    setTitle("");
    setGenre("");
    setYear(2025);
    setWatched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title..."
        className="rounded border border-gray-300 px-3 py-2"
      />
      <input
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre..."
        className="rounded border border-gray-300 px-3 py-2"
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        placeholder="Year..."
        className="rounded border border-gray-300 px-3 py-2"
      />
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
        Watched
      </label>
      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 text-white hover:opacity-90"
      >
        Add Movie
      </button>
    </form>
  );
}
"use client";

import MovieRowClient, { Movie } from "./MovieRowClient";



type Props = {
  movies: Movie[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, movie: Omit<Movie, "id">) => void;
};

export default function MovieListClient({ movies, onDelete, onUpdate }: Props) {
  return (
    <ul className="space-y-2">
      {movies.map((m) => (
        <MovieRowClient
          key={m.id}
          movie={m}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      {movies.length === 0 && <li className="text-gray-500">No movies yet.</li>}
    </ul>
  );
}

export type { Movie };
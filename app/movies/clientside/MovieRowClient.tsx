"use client";

import { useState } from "react";

export type Movie = {
  id: number;
  title: string;
  genre: string;
  year: number;
  watched: boolean;
};

type Props = {
  movie: Movie;
  onDelete: (id: number) => void;
  onUpdate: (id: number, movie: Omit<Movie, "id">) => void;
};

export default function MovieRowClient({ movie, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState(movie.genre);
  const [year, setYear] = useState(movie.year);
  const [watched, setWatched] = useState(movie.watched);

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(movie.id, { title, genre, year, watched });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(movie.title);
    setGenre(movie.genre);
    setYear(movie.year);
    setWatched(movie.watched);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col md:flex-row md:items-center justify-between border rounded px-3 py-2 space-y-2 md:space-y-0 md:space-x-2">
      {/* Info veerud */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-2 flex-1">
        <span className="w-1/12 font-semibold">{movie.id}</span>

        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-3/12 border rounded px-2 py-1"
            />
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-3/12 border rounded px-2 py-1"
            />
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-2/12 border rounded px-2 py-1"
            />
            <label className="flex items-center gap-1 w-1/12">
              <input
                type="checkbox"
                checked={watched}
                onChange={(e) => setWatched(e.target.checked)}
              />
              Watched
            </label>
          </>
        ) : (
          <>
            <span className="w-3/12">{title}</span>
            <span className="w-3/12">{genre}</span>
            <span className="w-2/12">{year}</span>
            <span className="w-1/12">{watched ? "Yes" : "No"}</span>
          </>
        )}
      </div>

      {/* Action nupud */}
      <div className="flex gap-2 md:w-2/12">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 px-2 py-1 rounded hover:opacity-90"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-400 px-2 py-1 rounded hover:opacity-90"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(movie.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:opacity-90"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
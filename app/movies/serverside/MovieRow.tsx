"use client";

import { useState } from "react";

type Movie = {
  id: number;
  title: string;
  genre: string;
  year: number;
  watched: boolean;
};

type Props = {
  movie: Movie;
  onDelete: (formData: FormData) => void;
  onUpdate: (formData: FormData) => void;
};

export default function MovieRow({ movie, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState(movie.genre);
  const [year, setYear] = useState(movie.year);
  const [watched, setWatched] = useState(movie.watched);

  return (
    <tr className="border-t">
      <td className="px-4 py-2">{movie.id}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            name="title"
            className="border rounded px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          movie.title
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            name="genre"
            className="border rounded px-2 py-1 w-full"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        ) : (
          movie.genre
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            name="year"
            type="number"
            className="border rounded px-2 py-1 w-full"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
        ) : (
          movie.year
        )}
      </td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            type="checkbox"
            name="watched"
            checked={watched}
            onChange={(e) => setWatched(e.target.checked)}
          />
        ) : watched ? (
          "Yes"
        ) : (
          "No"
        )}
      </td>
      <td className="px-4 py-2 flex gap-2">
        {isEditing ? (
          <>
            <form
              action={onUpdate}
              onSubmit={() => setIsEditing(false)}
              className="flex gap-2"
            >
              <input type="hidden" name="id" value={movie.id} />
              <input type="hidden" name="title" value={title} />
              <input type="hidden" name="genre" value={genre} />
              <input type="hidden" name="year" value={year} />
              <input type="hidden" name="watched" value={watched ? "true" : ""} />
              <button
                type="submit"
                className="rounded bg-blue-500 text-white px-2 py-1"
              >
                Save
              </button>
            </form>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(movie.title);
                setGenre(movie.genre);
                setYear(movie.year);
                setWatched(movie.watched);
              }}
              className="rounded bg-gray-300 px-2 py-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded bg-yellow-400 px-2 py-1"
            >
              Edit
            </button>
            <form action={onDelete}>
              <input type="hidden" name="id" value={movie.id} />
              <button
                type="submit"
                className="rounded bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </form>
          </>
        )}
      </td>
    </tr>
  );
}
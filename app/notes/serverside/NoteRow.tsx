"use client";

import { useState } from "react";

type Props = {
  note: { id: number; title: string };
  onDelete: (formData: FormData) => void;
  onUpdate: (formData: FormData) => void;
};

export default function NoteRow({ note, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);

  return (
    <tr className="border-t">
      <td className="px-4 py-2">{note.id}</td>
      <td className="px-4 py-2">
        {isEditing ? (
          <input
            name="title"
            className="border rounded px-2 py-1 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          note.title
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
              <input type="hidden" name="id" value={note.id} />
              <input type="hidden" name="title" value={title} />
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
                setTitle(note.title);
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
              <input type="hidden" name="id" value={note.id} />
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
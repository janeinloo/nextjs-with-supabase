"use client";

import { useState } from "react";

export type Note = { id: number; title: string };

type Props = {
  note: Note;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export default function NoteRowClient({ note, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);

  const handleSave = () => {
    if (!title.trim()) return;
    onUpdate(note.id, title);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(note.title);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between border rounded px-3 py-2 space-x-2">
      {isEditing ? (
        <input
          className="flex-1 border rounded px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <span className="flex-1">{note.title}</span>
      )}

      <div className="flex gap-2">
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
              onClick={() => onDelete(note.id)}
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
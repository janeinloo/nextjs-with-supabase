"use client";

import NoteRowClient, { Note } from "./NoteRowClient";

export type { Note }

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export default function NoteListClient({ notes, onDelete, onUpdate }: Props) {
  return (
    <ul className="space-y-2">
      {notes.map((n) => (
        <NoteRowClient
          key={n.id}
          note={n}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      {notes.length === 0 && (
        <li className="text-gray-500">No notes yet.</li>
      )}
    </ul>
  );
}
"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function NoteFormClient({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New note title..."
        className="flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 text-white hover:opacity-90"
      >
        Add
      </button>
    </form>
  );
}
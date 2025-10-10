"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import NoteFormClient from "./clientside/NoteFormClient";
import NoteListClient, { Note } from "./clientside/NoteListClient";

export default function Clientpage() {
  const supabase = createClient();
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("id, title, created_at")
      .order("created_at", { ascending: false });
    setNotes(data ?? []);
  };

  const addNote = async (title: string) => {
    await supabase.from("notes").insert({ title });
    fetchNotes();
  };

  const deleteNote = async (id: number) => {
    await supabase.from("notes").delete().eq("id", id);
    fetchNotes();
  };

  const updateNote = async (id: number, title: string) => {
    await supabase.from("notes").update({ title }).eq("id", id);
    fetchNotes();
  };

  return (
    <section className="space-y-4 border rounded-xl p-4">
      <h2 className="text-xl font-bold">Notes App (Client Component)</h2>
      <NoteFormClient onAdd={addNote} />
      <NoteListClient notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
    </section>
  );
}
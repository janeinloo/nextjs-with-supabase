import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import NoteList from "./serverside/NoteList";
import NoteForm from "./serverside/NoteForm";
import Clientpage from "./Clientpage";

export default async function NotesPage() {
  const supabase = await createClient();
  const { data: notes } = await supabase
    .from("notes")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  // CREATE
  async function createNote(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const title = String(formData.get("title") ?? "").trim();
    if (!title) return;
    await supabase.from("notes").insert({ title });
    revalidatePath("/notes");
  }

  // UPDATE
  async function updateNote(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    const title = String(formData.get("title") ?? "").trim();
    if (!id || !title) return;
    await supabase.from("notes").update({ title }).eq("id", id);
    revalidatePath("/notes");
  }

  // DELETE
  async function deleteNote(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    await supabase.from("notes").delete().eq("id", id);
    revalidatePath("/notes");
  }

  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">Notes (Server Component)</h1>

      <NoteForm onCreate={createNote} />
      <NoteList notes={notes ?? []} onDelete={deleteNote} onUpdate={updateNote} />

      <Clientpage />
    </div>
  );
}
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import MovieList from "./serverside/MovieList";
import MovieForm from "./serverside/MovieForm";
import Clientpage from "./Clientpage";

export default async function MoviesPage() {
  const supabase = await createClient();
  const { data: movies } = await supabase
    .from("movies")
    .select("id, title, genre, year, watched, created_at")
    .order("created_at", { ascending: false });

  // CREATE
  async function createMovie(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const title = String(formData.get("title") ?? "").trim();
    const genre = String(formData.get("genre") ?? "").trim();
    const year = Number(formData.get("year"));
    const watched = Boolean(formData.get("watched"));

    if (!title) return;
    await supabase
      .from("movies")
      .insert({ title, genre, year, watched });
    revalidatePath("/movies");
  }

  // UPDATE
  async function updateMovie(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    const title = String(formData.get("title") ?? "").trim();
    const genre = String(formData.get("genre") ?? "").trim();
    const year = Number(formData.get("year"));
    const watched = Boolean(formData.get("watched"));

    if (!id || !title) return;
    await supabase
      .from("movies")
      .update({ title, genre, year, watched })
      .eq("id", id);
    revalidatePath("/movies");
  }

  // DELETE
  async function deleteMovie(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    await supabase.from("movies").delete().eq("id", id);
    revalidatePath("/movies");
  }

  return (
    <div className="space-y-8 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Movies (Server Component)</h1>

      <MovieForm onCreate={createMovie} />
      <MovieList
        movies={movies ?? []}
        onDelete={deleteMovie}
        onUpdate={updateMovie}
      />

      <Clientpage />
    </div>
  );
}
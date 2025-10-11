"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import MovieFormClient from "./clientside/MovieFormClient";
import MovieListClient, { Movie } from "./clientside/MovieListClient";

export default function Clientpage() {
  const supabase = createClient();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = async () => {
    const { data } = await supabase
      .from("movies")
      .select("id, title, genre, year, watched")
      .order("created_at", { ascending: false });
    setMovies(data ?? []);
  };

  const addMovie = async (movie: Omit<Movie, "id">) => {
    await supabase.from("movies").insert(movie);
    fetchMovies();
  };

  const deleteMovie = async (id: number) => {
    await supabase.from("movies").delete().eq("id", id);
    fetchMovies();
  };

  const updateMovie = async (id: number, movie: Omit<Movie, "id">) => {
    await supabase.from("movies").update(movie).eq("id", id);
    fetchMovies();
  };

  return (
    <section className="space-y-4 border rounded-xl p-4">
      <h2 className="text-xl font-bold">Movies App (Client Component)</h2>
      <MovieFormClient onAdd={addMovie} />
      <MovieListClient movies={movies} onDelete={deleteMovie} onUpdate={updateMovie} />
    </section>
  );
}
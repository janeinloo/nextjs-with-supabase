"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Todo = { id: number; title: string; created_at: string };

export default function ClientTodo() {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTodos() {
    const { data } = await supabase
      .from("todos")
      .select("id,title,created_at")
      .order("created_at", { ascending: false });
    setTodos(data ?? []);
  }

  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    await supabase.from("todos").insert({ title });
    setTitle("");
    fetchTodos();
  }

  async function deleteTodo(id: number) {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  }

  return (
    <section className="space-y-4 border rounded-xl p-4">
      <h2 className="text-xl font-bold">TODO App (Client Component)</h2>

      {/* CREATE */}
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New todo..."
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white hover:opacity-90"
        >
          Add
        </button>
      </form>

      {/* LIST + DELETE */}
      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between border rounded px-3 py-2"
          >
            {t.title}
            <button
              onClick={() => deleteTodo(t.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-gray-500">No todos yet.</li>
        )}
      </ul>
    </section>
  );
}
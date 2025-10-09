"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import TodoFormClient from "./clientside/TodoFormClient";
import TodoListClient, { Todo } from "./clientside/TodoListClient";

export default function ClientTodo() {
  const supabase = createClient();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase
      .from("todos")
      .select("id,title,created_at")
      .order("created_at", { ascending: false });
    setTodos(data ?? []);
  };

  const addTodo = async (title: string) => {
    await supabase.from("todos").insert({ title });
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await supabase.from("todos").delete().eq("id", id);
    fetchTodos();
  };

  const updateTodo = async (id: number, title: string) => {
    await supabase.from("todos").update({ title }).eq("id", id);
    fetchTodos();
  };

  return (
    <section className="space-y-4 border rounded-xl p-4">
      <h2 className="text-xl font-bold">TODO App (Client Component)</h2>
      <TodoFormClient onAdd={addTodo} />
      <TodoListClient todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </section>
  );
}
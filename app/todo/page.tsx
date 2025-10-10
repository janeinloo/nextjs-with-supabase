import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import TodoForm from "./server/TodoForm"
import TodoList from "./server/TodoList"
import ClientTodo from "./ClientTodo"

export default async function TodoPage() {
  const supabase = await createClient()
  const { data: todos } = await supabase
    .from("todos")
    .select("id,title,created_at")
    .order("created_at", { ascending: false })

  async function createTodo(formData: FormData) {
    "use server"
    const supabase = await createClient()
    const title = String(formData.get("title") ?? "").trim()
    if (!title) return
    await supabase.from("todos").insert({ title })
    revalidatePath("/todo")
  }

  async function updateTodo(formData: FormData) {
    "use server"
    const supabase = await createClient()
    const id = Number(formData.get("id"))
    const title = String(formData.get("title") ?? "").trim()
    if (!id || !title) return
    await supabase.from("todos").update({ title }).eq("id", id)
    revalidatePath("/todo")
  }

  async function deleteTodo(formData: FormData) {
    "use server"
    const supabase = await createClient()
    const id = Number(formData.get("id"))
    if (!id) return
    await supabase.from("todos").delete().eq("id", id)
    revalidatePath("/todo")
  }

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600">
        TODO App (Server Component)
      </h1>

      <TodoForm action={createTodo} />

      <TodoList
        todos={todos ?? []}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />

      {/* optional client-side component */}
      <ClientTodo />
    </div>
  )
}

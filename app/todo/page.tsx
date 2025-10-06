import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import ClientTodo from "./ClientTodo";

export default async function TodoPage() {
  const supabase = await createClient();
  const { data: todos } = await supabase
    .from("todos")
    .select("id,title,created_at")
    .order("created_at", { ascending: false });

  // CREATE
  async function createTodo(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const title = String(formData.get("title") ?? "").trim();
    if (!title) return;
    await supabase.from("todos").insert({ title });
    revalidatePath("/todo");
  }

  // DELETE
  async function deleteTodo(formData: FormData) {
    "use server";
    const supabase = await createClient();
    const id = Number(formData.get("id"));
    if (!id) return;
    await supabase.from("todos").delete().eq("id", id);
    revalidatePath("/todo");
  }

  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">TODO App (Server Component)</h1>

      {/* CREATE form */}
      <form action={createTodo} className="flex gap-2">
        <input
          name="title"
          placeholder="New todo..."
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:opacity-90"
        >
          Add
        </button>
      </form>

      {/* LIST + DELETE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2">{t.id}</td>
                <td className="px-4 py-2">{t.title}</td>
                <td className="px-4 py-2">
                  <form action={deleteTodo}>
                    <input type="hidden" name="id" value={t.id} />
                    <button
                      type="submit"
                      className="rounded border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {(!todos || todos.length === 0) && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>
                  No todos yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Client Component */}
      <ClientTodo />
    </div>
  );
}
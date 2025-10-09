import TodoRow from "./TodoRow"

type Todo = { id: number; title: string }

export default function TodoList({
  todos,
  onUpdate,
  onDelete,
}: {
  todos: Todo[]
  onUpdate: (formData: FormData) => void
  onDelete: (formData: FormData) => void
}) {
  return (
    <table className="min-w-full border border-gray-200 rounded-lg shadow">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Title</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(t => (
          <TodoRow
            key={t.id}
            todo={t}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  )
}

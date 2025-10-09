export default function TodoForm({
  action,
}: {
  action: (formData: FormData) => void
}) {
  return (
    <form
      action={action}
      className="flex gap-2"
    >
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
  )
}

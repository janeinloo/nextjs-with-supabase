type Props = {
  onCreate: (formData: FormData) => void;
};

export default function NoteForm({ onCreate }: Props) {
  return (
    <form action={onCreate} className="flex gap-2">
      <input
        name="title"
        placeholder="New note title..."
        className="flex-1 rounded border border-gray-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Add
      </button>
    </form>
  );
}
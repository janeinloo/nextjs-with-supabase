type Props = {
  onCreate: (formData: FormData) => void;
};

export default function MovieForm({ onCreate }: Props) {
  return (
    <form action={onCreate} className="flex flex-col gap-2">
      <input
        name="title"
        placeholder="Movie title..."
        className="rounded border border-gray-300 px-3 py-2"
      />
      <input
        name="genre"
        placeholder="Genre..."
        className="rounded border border-gray-300 px-3 py-2"
      />
      <input
        name="year"
        type="number"
        placeholder="Year..."
        className="rounded border border-gray-300 px-3 py-2"
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" name="watched" />
        Watched
      </label>
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white hover:opacity-90"
      >
        Add Movie
      </button>
    </form>
  );
}
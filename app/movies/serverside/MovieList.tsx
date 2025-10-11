import MovieRow from "./MovieRow";

type Movie = {
  id: number;
  title: string;
  genre: string;
  year: number;
  watched: boolean;
};

type Props = {
  movies: Movie[];
  onDelete: (formData: FormData) => void;
  onUpdate: (formData: FormData) => void;
};

export default function MovieList({ movies, onDelete, onUpdate }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Genre</th>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Watched</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <MovieRow
              key={movie.id}
              movie={movie}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
          {movies.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-gray-500" colSpan={6}>
                No movies yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
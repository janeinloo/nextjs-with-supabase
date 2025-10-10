import NoteRow from "./NoteRow";

type Props = {
  notes: { id: number; title: string }[];
  onDelete: (formData: FormData) => void;
  onUpdate: (formData: FormData) => void;
};

export default function NoteList({ notes, onDelete, onUpdate }: Props) {
  return (
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
          {notes.map((note) => (
            <NoteRow
              key={note.id}
              note={note}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
          {notes.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-gray-500" colSpan={3}>
                No notes yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
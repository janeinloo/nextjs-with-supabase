import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NoteListClient from "../NoteListClient";

// Mockime child-komponendi, et ei testiks NoteRowClient-i siin uuesti
vi.mock("../NoteRowClient", () => ({
  default: ({ note, onDelete, onUpdate }: { 
    note: { id: number; title: string };
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string) => void;
   }) => (
    <div data-testid="note-row">
      <span>{note.title}</span>
      <button onClick={() => onUpdate(note.id, "Updated!")}>Update</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  ),
}));

describe("NoteListClient", () => {
  it("renders 'No notes yet.' when notes array is empty", () => {
    render(<NoteListClient notes={[]} onDelete={vi.fn()} onUpdate={vi.fn()} />);
    expect(screen.getByText(/no notes yet/i)).toBeInTheDocument();
  });

  it("renders all notes when notes are provided", () => {
    const notes = [
      { id: 1, title: "First Note" },
      { id: 2, title: "Second Note" },
    ];
    render(
      <NoteListClient notes={notes} onDelete={vi.fn()} onUpdate={vi.fn()} />
    );
    expect(screen.getAllByTestId("note-row")).toHaveLength(2);
    expect(screen.getByText("First Note")).toBeInTheDocument();
    expect(screen.getByText("Second Note")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = vi.fn();
    const note = { id: 1, title: "Test Note" };

    render(
      <NoteListClient
        notes={[note]}
        onDelete={onDelete}
        onUpdate={vi.fn()}
      />
    );

    screen.getByText("Delete").click();
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdate when update button clicked", () => {
    const onUpdate = vi.fn();
    const note = { id: 5, title: "Editable Note" };

    render(
      <NoteListClient
        notes={[note]}
        onDelete={vi.fn()}
        onUpdate={onUpdate}
      />
    );

    screen.getByText("Update").click();
    expect(onUpdate).toHaveBeenCalledWith(5, "Updated!");
  });
});
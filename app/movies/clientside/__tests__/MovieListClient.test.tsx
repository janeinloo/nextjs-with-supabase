import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieListClient from "../MovieListClient";

vi.mock("../MovieRowClient", () => ({
  default: ({ movie, onDelete, onUpdate }: {
    movie: { id: number; title: string; genre: string; year: number; watched: boolean };
    onDelete: (id: number) => void;
    onUpdate: (id: number, movie: { title: string; genre: string; year: number; watched: boolean }) => void;
  }) => (
    <div data-testid="movie-row">
      <span>{movie.title}</span>
      <button onClick={() => onUpdate(movie.id, { title: "Updated!", genre: "Updated", year: 2000, watched: true })}>
        Update
      </button>
      <button onClick={() => onDelete(movie.id)}>Delete</button>
    </div>
  ),
}));

describe("MovieListClient", () => {
  it("renders 'No movies yet.' when movies array is empty", () => {
    render(<MovieListClient movies={[]} onDelete={vi.fn()} onUpdate={vi.fn()} />);
    expect(screen.getByText(/no movies yet/i)).toBeInTheDocument();
  });

  it("renders all movies when provided", () => {
    const movies = [
      { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, watched: true },
      { id: 2, title: "Titanic", genre: "Drama", year: 1997, watched: false },
    ];
    render(<MovieListClient movies={movies} onDelete={vi.fn()} onUpdate={vi.fn()} />);

    expect(screen.getAllByTestId("movie-row")).toHaveLength(2);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Titanic")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = vi.fn();
    const movie = { id: 1, title: "Test Movie", genre: "", year: 2020, watched: false };

    render(<MovieListClient movies={[movie]} onDelete={onDelete} onUpdate={vi.fn()} />);
    screen.getByText("Delete").click();

    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdate when update button clicked", () => {
    const onUpdate = vi.fn();
    const movie = { id: 1, title: "Old Movie", genre: "Drama", year: 1990, watched: false };

    render(<MovieListClient movies={[movie]} onDelete={vi.fn()} onUpdate={onUpdate} />);
    screen.getByText("Update").click();

    expect(onUpdate).toHaveBeenCalledWith(1, {
      title: "Updated!",
      genre: "Updated",
      year: 2000,
      watched: true,
    });
  });
});
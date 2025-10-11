import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieRowClient, { Movie } from "../MovieRowClient";

describe("MovieRowClient", () => {
  const movie: Movie = {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    watched: true,
  };

  it("renders movie details and buttons", () => {
    render(<MovieRowClient movie={movie} onDelete={vi.fn()} onUpdate={vi.fn()} />);

    expect(screen.getByText("Inception")).toBeDefined();
    expect(screen.getByText("Sci-Fi")).toBeDefined();
    expect(screen.getByText("2010")).toBeDefined();
    expect(screen.getByText("Yes")).toBeDefined();
    expect(screen.getByText("Edit")).toBeDefined();
    expect(screen.getByText("Delete")).toBeDefined();
  });

  it("enters edit mode and shows editable fields", () => {
    render(<MovieRowClient movie={movie} onDelete={vi.fn()} onUpdate={vi.fn()} />);
    fireEvent.click(screen.getByText("Edit"));

    expect(screen.getByDisplayValue("Inception")).toBeDefined();
    expect(screen.getByDisplayValue("Sci-Fi")).toBeDefined();
    expect(screen.getByDisplayValue("2010")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("calls onUpdate with new values and exits edit mode", () => {
    const onUpdate = vi.fn();
    render(<MovieRowClient movie={movie} onDelete={vi.fn()} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByText("Edit"));
    fireEvent.change(screen.getByDisplayValue("Inception"), { target: { value: "Interstellar" } });
    fireEvent.click(screen.getByText("Save"));

    expect(onUpdate).toHaveBeenCalledWith(1, {
      title: "Interstellar",
      genre: "Sci-Fi",
      year: 2010,
      watched: true,
    });
  });

  it("calls onDelete when Delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<MovieRowClient movie={movie} onDelete={onDelete} onUpdate={vi.fn()} />);

    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
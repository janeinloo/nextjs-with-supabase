import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MovieFormClient from "../MovieFormClient";

describe("MovieFormClient", () => {
  it("does not call onAdd when title input is empty", () => {
    const onAdd = vi.fn();
    render(<MovieFormClient onAdd={onAdd} />);

    const addButton = screen.getByRole("button", { name: /add movie/i });
    fireEvent.click(addButton);

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("calls onAdd with correct data and clears inputs", () => {
    const onAdd = vi.fn();
    render(<MovieFormClient onAdd={onAdd} />);

    const titleInput = screen.getByPlaceholderText(/movie title/i) as HTMLInputElement;
    const genreInput = screen.getByPlaceholderText(/genre/i) as HTMLInputElement;
    const yearInput = screen.getByPlaceholderText(/year/i) as HTMLInputElement;
    const watchedCheckbox = screen.getByRole("checkbox");

    fireEvent.change(titleInput, { target: { value: "Inception" } });
    fireEvent.change(genreInput, { target: { value: "Sci-Fi" } });
    fireEvent.change(yearInput, { target: { value: "2010" } });
    fireEvent.click(watchedCheckbox);

    fireEvent.click(screen.getByRole("button", { name: /add movie/i }));

    expect(onAdd).toHaveBeenCalledWith({
      title: "Inception",
      genre: "Sci-Fi",
      year: 2010,
      watched: true,
    });

    expect(titleInput.value).toBe("");
    expect(genreInput.value).toBe("");
    expect(yearInput.value).toBe("2025");
    expect((watchedCheckbox as HTMLInputElement).checked).toBe(false);
  });
});
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoListClient, { Todo } from "../TodoListClient";

// Mockime child-komponendi, et ei testiks TodoRowClient-i siin uuesti
vi.mock("../TodoRowClient", () => ({
  default: ({ todo, onDelete, onUpdate }: { 
    todo: Todo;
    onDelete: (id: number) => void;
    onUpdate: (id: number, title: string) => void;
   }) => (
    <div data-testid="todo-row">
      <span>{todo.title}</span>
      <button onClick={() => onUpdate(todo.id, "Updated!")}>Update</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  ),
}));

describe("TodoListClient", () => {
  it("renders 'No todos yet.' when todos array is empty", () => {
    render(<TodoListClient todos={[]} onDelete={vi.fn()} onUpdate={vi.fn()} />);
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });

  it("renders all todos when todos are provided", () => {
    const todos: Todo[] = [
      { id: 1, title: "First Todo" },
      { id: 2, title: "Second Todo" },
    ];
    render(
      <TodoListClient todos={todos} onDelete={vi.fn()} onUpdate={vi.fn()} />
    );
    expect(screen.getAllByTestId("todo-row")).toHaveLength(2);
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = vi.fn();
    const todo: Todo = { id: 1, title: "Test Todo" };

    render(
      <TodoListClient
        todos={[todo]}
        onDelete={onDelete}
        onUpdate={vi.fn()}
      />
    );

    screen.getByText("Delete").click();
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("calls onUpdate when update button clicked", () => {
    const onUpdate = vi.fn();
    const todo: Todo = { id: 5, title: "Editable Todo" };

    render(
      <TodoListClient
        todos={[todo]}
        onDelete={vi.fn()}
        onUpdate={onUpdate}
      />
    );

    screen.getByText("Update").click();
    expect(onUpdate).toHaveBeenCalledWith(5, "Updated!");
  });
});
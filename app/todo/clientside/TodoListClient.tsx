"use client";

import TodoRowClient, { Todo } from "./TodoRowClient";

type Props = {
  todos: Todo[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
};

export default function TodoListClient({ todos, onDelete, onUpdate }: Props) {
  return (
    <ul className="space-y-2">
      {todos.map((t) => (
        <TodoRowClient
          key={t.id}
          todo={t}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
      {todos.length === 0 && <li className="text-gray-500">No todos yet.</li>}
    </ul>
  );
}

export type { Todo };
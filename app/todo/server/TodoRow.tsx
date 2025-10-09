"use client"

import { useState } from "react"

type Todo = {
  id: number
  title: string
}

export default function TodoRow({
  todo,
  onUpdate,
  onDelete,
}: {
  todo: Todo
  onUpdate: (formData: FormData) => void
  onDelete: (formData: FormData) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const handleUpdate = () => {
    const formData = new FormData()
    formData.append("id", String(todo.id))
    formData.append("title", title)
    onUpdate(formData)
    setIsEditing(false)
  }

  const handleDelete = () => {
    const formData = new FormData()
    formData.append("id", String(todo.id))
    onDelete(formData)
  }

  return (
    <tr>
      <td>{todo.id}</td>
      <td>
        {isEditing ? (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded px-2 py-1"
          />
        ) : (
          todo.title
        )}
      </td>
      <td className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleUpdate}
              className="rounded bg-blue-600 text-white px-3 py-1"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setTitle(todo.title)
              }}
              className="rounded border px-3 py-1"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded border px-3 py-1"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="rounded border border-red-300 text-red-700 px-3 py-1 hover:bg-red-50"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  )
}

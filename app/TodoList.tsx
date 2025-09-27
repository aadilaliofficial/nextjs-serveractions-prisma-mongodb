"use client";

import { Todo } from "@prisma/client";

interface Props {
  todos: Todo[];
  handleToggleTodo: (formData: FormData) => Promise<void>;
  handleDeleteTodo: (formData: FormData) => Promise<void>;
}

export default function TodoList({ todos, handleToggleTodo, handleDeleteTodo }: Props) {
  return (
    <ul className="w-full max-w-md space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center bg-white p-4 rounded shadow"
        >
          <span
            className={`${
              todo.done ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.title}
          </span>

          <div className="flex gap-2">
            
            {/* Toggle Done Button */}
            <form action={handleToggleTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className={`px-3 py-1 rounded ${
                  todo.done
                    ? "bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                    : "bg-green-500 text-white hover:bg-green-600"
                } transition`}
              >
                {todo.done ? "Mark Pending" : "Mark Done"}
              </button>
            </form>

            {/* Delete Button */}
            <form action={handleDeleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}

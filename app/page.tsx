import { addTodos, toggleTodoDone, getTodos, deleteTodo } from "./todos/actions";
import { revalidatePath } from "next/cache";
import TodoList from "./TodoList";

export default async function HomePage() {
  const todos = await getTodos();

  // Server Action: Add Todo
  async function handleAddTodo(formData: FormData) {
    "use server";
    const title = formData.get("title")?.toString();
    if (!title) return;
    await addTodos(title);
    revalidatePath("/");
  }

  // Server Action: Toggle Done
  async function handleToggleTodo(formData: FormData) {
    "use server";
    const id = formData.get("id")?.toString();
    if (!id) return;
    await toggleTodoDone(id);
    revalidatePath("/");
  }

  // Server Action: Delete Todo
  async function handleDeleteTodo(formData: FormData) {
    "use server";
    const id = formData.get("id")?.toString();
    if (!id) return;
    await deleteTodo(id);
    revalidatePath("/");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Next.js + Prisma + MongoDB Todos
      </h1>

      {/* Add Todo Form */}
      <form action={handleAddTodo} className="flex w-full max-w-md mb-6">
        <input
          name="title"
          placeholder="Add a new todo"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>

      {/* Todo List (Client Component to avoid hydration errors) */}
      <TodoList
        todos={todos}
        handleToggleTodo={handleToggleTodo}
        handleDeleteTodo={handleDeleteTodo}
      />
    </main>
  );
}

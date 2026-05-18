import { useFetch } from "../hooks/useFetch";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";
import type { ToDo } from "../types";

interface TodoListProps {
  userId: number;
}

export const TodoList = ({ userId }: TodoListProps) => {
  const {
    data: todos,
    loading,
    error,
  } = useFetch<ToDo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!todos) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4">
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0"
          >
            <span
              className={`mt-0.5 h-4 w-4 rounded-full border-2 flex-shrink-0 ${
                todo.completed ? "bg-green-500 border-green-500" : "bg-white border-gray-300"
              }`}
              aria-hidden="true"
            />
            <span className={`text-sm ${todo.completed ? "text-gray-500 line-through" : "text-gray-800"}`}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

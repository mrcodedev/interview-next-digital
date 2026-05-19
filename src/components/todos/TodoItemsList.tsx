import { TrashIcon } from "@heroicons/react/24/outline";
import type { Todo } from "../../types";

interface TodoItemsListProps {
  todos: Todo[];
  filter: string;
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodoItemsList = ({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
}: TodoItemsListProps) => (
  <ul className="divide-y divide-gray-50">
    {todos.map((todo) => (
      <li
        key={todo.id}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
          className="w-4 h-4 accent-indigo-600 cursor-pointer flex-shrink-0"
        />
        <span
          className={`flex-1 text-sm capitalize leading-relaxed ${
            todo.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {todo.title}
        </span>
        <button
          onClick={() => onDeleteTodo(todo.id)}
          aria-label="Delete todo"
          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg p-1.5 transition-all flex-shrink-0"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </li>
    ))}

    {todos.length === 0 && (
      <li className="text-center py-10">
        <p className="text-gray-400 text-sm">
          {filter ? `No TODOs match "${filter}"` : "No TODOs yet. Add one above!"}
        </p>
      </li>
    )}
  </ul>
);

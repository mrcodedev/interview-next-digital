import { PlusIcon } from "@heroicons/react/24/outline";

interface TodoCreateFormProps {
  title: string;
  validationError: string;
  onChangeTitle: (title: string) => void;
  onAddTodo: () => void;
}

export const TodoCreateForm = ({
  title,
  validationError,
  onChangeTitle,
  onAddTodo,
}: TodoCreateFormProps) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-4">
    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">New TODO</p>
    <div className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => onChangeTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAddTodo()}
        placeholder="Write a task (text only)..."
        className={`flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none transition-all ${
          validationError
            ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
            : "border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        }`}
      />
      <button
        onClick={onAddTodo}
        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all flex-shrink-0 flex items-center gap-1.5"
      >
        <PlusIcon className="w-4 h-4" />
        Add
      </button>
    </div>

    {validationError && <p className="text-red-500 text-xs mt-2 px-1">⚠ {validationError}</p>}
  </div>
);

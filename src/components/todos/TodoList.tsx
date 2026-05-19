import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { Spinner, ErrorMessage } from "../feedback";
import type { Todo } from "../../types";
import { TodoCreateForm } from "./TodoCreateForm";
import { TodoItemsList } from "./TodoItemsList";
import { TodoSearchBar } from "./TodoSearchBar";
import { TodoStats } from "./TodoStats";

interface TodoListProps {
  userId: number;
}

export const TodoList = ({ userId }: TodoListProps) => {
  const {
    data: fetchedTodos,
    loading,
    error,
  } = useFetch<Todo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [validationError, setValidationError] = useState("");
  const [filter, setFilter] = useState("");
  const [synced, setSynced] = useState(false);

  if (fetchedTodos && !synced) {
    setTodos(fetchedTodos);
    setSynced(true);
  }

  const hasNumbers = (text: string) => /\d/.test(text);

  const handleAdd = () => {
    const trimmed = newTitle.trim();

    if (!trimmed) {
      setValidationError("Title cannot be empty.");
      return;
    }

    if (hasNumbers(trimmed)) {
      setValidationError("Title cannot contain numbers, only text.");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId,
      title: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setNewTitle("");
    setValidationError("");
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  );

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-4">
      <TodoStats total={todos.length} pending={pendingCount} completed={completedCount} />

      <TodoCreateForm
        title={newTitle}
        validationError={validationError}
        onChangeTitle={(title) => {
          setNewTitle(title);
          setValidationError("");
        }}
        onAddTodo={handleAdd}
      />

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <TodoSearchBar
          filter={filter}
          resultsCount={filteredTodos.length}
          onChangeFilter={setFilter}
          onClearFilter={() => setFilter("")}
        />

        <TodoItemsList
          todos={filteredTodos}
          filter={filter}
          onToggleTodo={handleToggle}
          onDeleteTodo={handleDelete}
        />
      </div>
    </div>
  );
};

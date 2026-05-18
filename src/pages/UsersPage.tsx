import { useFetch } from "../hooks/useFetch";
import { UserCard } from "../components/UserCard";
import { Spinner } from "../components/Spinner";
import type { User } from "../types";

export function UsersPage() {
  const {
    data: users,
    loading,
    error,
  } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-gray-500 mt-1">Red social — listado de miembros</p>
        </div>

        {loading && <Spinner />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            Error al cargar usuarios: {error}
          </div>
        )}

        {users && (
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

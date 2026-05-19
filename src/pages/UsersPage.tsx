import { useFetch } from "../hooks/useFetch";
import { UserCard, Spinner, ErrorMessage } from "../components";
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

        {error && <ErrorMessage message={`al cargar usuarios: ${error}`} />}

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

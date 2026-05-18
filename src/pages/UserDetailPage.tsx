import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { AlbumList } from "../components/AlbumList";
import { TodoList } from "../components/TodoList.tsx";
import { Spinner } from "../components/Spinner";
import { ErrorMessage } from "../components/ErrorMessage";
import type { User } from "../types";

export const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    loading,
    error,
  } = useFetch<User>(id ? `https://jsonplaceholder.typicode.com/users/${id}` : null);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-6"
        >
          Volver
        </button>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-700 font-bold text-lg">
                {user.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm">
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="Ciudad" value={user.address.city} />
            <InfoRow label="Website" value={user.website} />
            <InfoRow label="Empresa" value={user.company.name} />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Álbumes</h2>
          <AlbumList userId={user.id} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">TODOs</h2>
          <TodoList userId={user.id} />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);

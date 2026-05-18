import { Link } from "react-router-dom";
import { useRecentAlbumsContext } from "../hooks/useRecentAlbumsContext";

export const HomePage = () => {
  const { recentAlbums, clearRecentAlbums } = useRecentAlbumsContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Bienvenido a <span className="text-indigo-600">SocialApp</span>
          </h1>
          <p className="text-gray-500 mb-6">Explora usuarios, álbumes y mucho más.</p>
          <Link
            to="/users"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            Ver usuarios
          </Link>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recién visitados</h2>
            {recentAlbums.length > 0 && (
              <button
                onClick={clearRecentAlbums}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Limpiar
              </button>
            )}
          </div>
          {recentAlbums.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">Todavía no has visitado ningún álbum.</p>
              <p className="text-gray-300 text-xs mt-1">
                Entra en un usuario y explora sus álbumes.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {recentAlbums.map((album) => (
                <div
                  key={album.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors"
                >
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-lg flex-shrink-0">
                    #{album.id}
                  </span>
                  <span className="text-sm text-gray-700 truncate capitalize">{album.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Spinner } from "./Spinner";
import type { Album, Photo } from "../types";

interface AlbumCardProps {
  album: Album;
  onVisit: () => void;
}

export const AlbumCard = ({ album, onVisit }: AlbumCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: photos, loading } = useFetch<Photo[]>(
    isOpen ? `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}` : null
  );
  const { data: firstPhoto } = useFetch<Photo[]>(
    `https://jsonplaceholder.typicode.com/photos?albumId=${album.id}&_limit=1`
  );

  const thumbnail = firstPhoto?.[0];

  const handleToggle = () => {
    if (!isOpen) onVisit();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
          {thumbnail ? (
            <img
              src={thumbnail.thumbnailUrl}
              alt={thumbnail.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
              Photo:
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-indigo-600 font-medium mb-0.5">Álbum #{album.id}</p>
          <p className="text-sm font-medium text-gray-900 truncate capitalize">{album.title}</p>
        </div>

        <span className="text-gray-400 text-xs flex-shrink-0">{isOpen ? "Up" : "Down"}</span>
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 p-4">
          {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {photos?.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  title={photo.title}
                >
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

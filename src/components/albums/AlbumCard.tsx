import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../feedback";
import type { Album, Photo } from "../../types";
import { FallbackPhoto, PhotoWithFallback } from "../media";

interface Props {
  album: Album;
  onVisit: () => void;
}

export const AlbumCard = ({ album, onVisit }: Props) => {
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
        <div className="w-14 h-14 rounded-xl overflow-hidden bg-indigo-50 flex-shrink-0 flex items-center justify-center">
          {thumbnail ? (
            <PhotoWithFallback
              src={thumbnail.thumbnailUrl}
              alt={thumbnail.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <FallbackPhoto size="lg" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-indigo-600 font-medium mb-0.5">Album #{album.id}</p>
          <p className="text-sm font-medium text-gray-900 truncate capitalize">{album.title}</p>
        </div>

        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
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
                  className="aspect-square rounded-lg overflow-hidden bg-indigo-50"
                  title={photo.title}
                >
                  <PhotoWithFallback
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    fallbackId={photo.id}
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

import { useFetch } from "../../hooks/useFetch";
import { useRecentAlbumsContext } from "../../hooks/useRecentAlbumsContext";
import { Spinner, ErrorMessage } from "../feedback";
import { AlbumCard } from "./AlbumCard";
import type { Album } from "../../types";

interface AlbumListProps {
  userId: number;
}

export const AlbumList = ({ userId }: AlbumListProps) => {
  const {
    data: albums,
    loading,
    error,
  } = useFetch<Album[]>(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  const { addRecentAlbum } = useRecentAlbumsContext();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!albums) return null;

  return (
    <div className="flex flex-col gap-3">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} onVisit={() => addRecentAlbum(album)} />
      ))}
    </div>
  );
};

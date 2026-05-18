import { useState } from "react";
import type { Album } from "../types";

const STORAGE_KEY = "recent_albums";
const MAX_RECENT = 5;

export const useRecentAlbums = () => {
  const [recentAlbums, setRecentAlbums] = useState<Album[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Album[]) : [];
    } catch {
      return [];
    }
  });

  const addRecentAlbum = (album: Album) => {
    setRecentAlbums((prev) => {
      const filtered = prev.filter((a) => a.id !== album.id);
      const updated = [album, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentAlbums = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentAlbums([]);
  };

  return { recentAlbums, addRecentAlbum, clearRecentAlbums };
};

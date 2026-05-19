import { createContext } from "react";
import type { Album } from "../types";

export interface RecentAlbumsContextType {
  recentAlbums: Album[];
  addRecentAlbum: (album: Album) => void;
  clearRecentAlbums: () => void;
}

export const RecentAlbumsContext = createContext<RecentAlbumsContextType | null>(null);

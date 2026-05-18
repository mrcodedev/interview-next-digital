import type { ReactNode } from "react";
import { useRecentAlbums } from "../hooks/useRecentAlbums";
import { RecentAlbumsContext } from "./RecentAlbumsContextObject";

export const RecentAlbumsProvider = ({ children }: { children: ReactNode }) => {
  const value = useRecentAlbums();
  return (
    <RecentAlbumsContext.Provider value={value}>
      {children}
    </RecentAlbumsContext.Provider>
  );
};
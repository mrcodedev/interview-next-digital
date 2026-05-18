import { useContext } from "react";
import { RecentAlbumsContext } from "../context/RecentAlbumsContextObject";

export const useRecentAlbumsContext = () => {
  const ctx = useContext(RecentAlbumsContext);
  if (!ctx) throw new Error("useRecentAlbumsContext debe usarse dentro de RecentAlbumsProvider");
  return ctx;
};

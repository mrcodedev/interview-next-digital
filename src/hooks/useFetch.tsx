import { useState, useEffect } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: Status;
}

export const useFetch = <T,>(url: string | null): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<Status>(url ? "loading" : "idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setStatus("loading");
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const json = (await res.json()) as T;
        setData(json);
        setStatus("success");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
          setStatus("error");
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, status, error, loading: status === "loading" };
};

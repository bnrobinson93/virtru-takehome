import { useEffect, useRef, useState } from "react";

const useFetch = (url: string, interval: number): UseFetchReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ServicesHealth | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const [paused, setPaused] = useState(false);

  const abortControllerRef = useRef<AbortController>();

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  useEffect(() => {
    console.log("running", { url, interval, paused });
    const fetchData = async () => {
      // Cancel any pending requests
      // This will throw an error but we'll ignore it in the catch
      abortControllerRef.current?.abort();

      if (paused) return;

      // Create new controller for this request
      abortControllerRef.current = new AbortController();
      setLoading(true);

      try {
        const response = (await fetch(url, {
          signal: abortControllerRef.current.signal,
        })) as Response;
        if (!response.ok) throw new Error("Failed to fetch data");

        const result: ServicesHealth = await response.json();

        setData(result);
        setError(null);
      } catch (error) {
        const err: Error = error as Error;
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
        setLastUpdated(new Date().toISOString());
      }
    };

    // initial fetch
    fetchData();

    const intervalId = setInterval(fetchData, interval);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      abortControllerRef.current?.abort();
    };
  }, [url, interval, paused]);

  return { data, error, loading, lastUpdated, paused, pause, resume };
};

export default useFetch;

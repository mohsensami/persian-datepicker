import { useState, useEffect, useCallback, useRef } from "react";

interface FetchOptions<TParams> {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: BodyInit | null;
  params?: TParams;
}

interface UseFetchOptions {
  enabled?: boolean; // Control if the fetch should run automatically
  staleTime?: number; // Time in ms to mark the data as stale
}

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isStale: boolean;
}

function useFetch<TResponse, TParams = unknown>(
  fetchOptions: FetchOptions<TParams>,
  { enabled = true, staleTime = 0 }: UseFetchOptions = {}
) {
  const [state, setState] = useState<FetchState<TResponse>>({
    data: null,
    isLoading: false,
    isError: false,
    error: null,
    isStale: false,
  });

  const lastFetchedTimeRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoized fetch options to prevent infinite re-renders
  const memoizedOptions = useRef(fetchOptions);
  useEffect(() => {
    memoizedOptions.current = fetchOptions;
  }, [fetchOptions]);

  const fetchData = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isError: false,
      error: null,
    }));
    abortControllerRef.current = new AbortController();

    try {
      const {
        url,
        method = "GET",
        headers,
        body,
        params,
      } = memoizedOptions.current;

      // Build query params
      const queryParams = params
        ? new URLSearchParams(params as Record<string, string>).toString()
        : "";
      const fullUrl = queryParams ? `${url}?${queryParams}` : url;

      // Make the fetch call
      const response = await fetch(fullUrl, {
        method,
        headers,
        body,
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.statusText}`);
      }

      const data: TResponse = await response.json();
      setState({
        data,
        isLoading: false,
        isError: false,
        error: null,
        isStale: false,
      });
      lastFetchedTimeRef.current = Date.now();
    } catch (error: any) {
      if (error.name !== "AbortError") {
        setState({
          data: null,
          isLoading: false,
          isError: true,
          error: error.message || "An error occurred",
          isStale: false,
        });
      }
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const isStale = lastFetchedTimeRef.current
      ? Date.now() - lastFetchedTimeRef.current > staleTime
      : true;

    if (isStale) {
      fetchData();
    } else {
      setState((prevState) => ({ ...prevState, isStale: false }));
    }
  }, [enabled, fetchData, staleTime]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    ...state,
    refetch: fetchData,
  };
}

export default useFetch;

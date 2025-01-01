import { useState, useCallback, useEffect } from "react";

interface UseCopyToClipboardOptions {
  resetAfterMs?: number; // Automatically reset the state after a delay (in ms)
}

interface CopyState {
  value: string | null;
  success: boolean | null;
  error: string | null;
}

function useCopyToClipboard({
  resetAfterMs = 2000,
}: UseCopyToClipboardOptions = {}) {
  const [copyState, setCopyState] = useState<CopyState>({
    value: null,
    success: null,
    error: null,
  });

  const copyToClipboard = useCallback((text: string) => {
    if (!navigator.clipboard) {
      setCopyState({
        value: null,
        success: false,
        error: "Clipboard API not supported",
      });
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyState({ value: text, success: true, error: null });
      })
      .catch((err) => {
        setCopyState({ value: null, success: false, error: err.message });
      });
  }, []);

  // Automatically reset the state after a specified duration
  useEffect(() => {
    if (resetAfterMs && (copyState.success || copyState.error)) {
      const timeout = setTimeout(() => {
        setCopyState({ value: null, success: null, error: null });
      }, resetAfterMs);

      return () => clearTimeout(timeout);
    }
  }, [copyState, resetAfterMs]);

  return { ...copyState, copyToClipboard };
}

export default useCopyToClipboard;

import { useState, useEffect, useCallback } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface UseMousePositionReturn {
  position: MousePosition;
  attachMouseTracker: (element: HTMLElement | null) => void;
  detachMouseTracker: () => void;
}

const useMousePosition = (): UseMousePositionReturn => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [trackedElement, setTrackedElement] = useState<HTMLElement | null>(
    null
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (trackedElement) {
        const rect = trackedElement.getBoundingClientRect();
        setPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      } else {
        setPosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    },
    [trackedElement]
  );

  const attachMouseTracker = useCallback((element: HTMLElement | null) => {
    setTrackedElement(element);
  }, []);

  const detachMouseTracker = useCallback(() => {
    setTrackedElement(null);
  }, []);

  useEffect(() => {
    const target = trackedElement || window;
    target.addEventListener("mousemove", handleMouseMove);

    return () => {
      target.removeEventListener("mousemove", handleMouseMove);
    };
  }, [trackedElement, handleMouseMove]);

  return { position, attachMouseTracker, detachMouseTracker };
};

export default useMousePosition;

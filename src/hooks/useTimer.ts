import { useState, useEffect, useCallback } from "react";

interface UseTimerOptions {
  initialTime: number; // Time in seconds
  onFinish?: () => void; // Callback when the timer finishes
}

interface UseTimerReturn {
  time: number; // Remaining time in seconds
  minutes: number; // Remaining minutes
  seconds: number; // Remaining seconds
  isRunning: boolean; // Whether the timer is running
  start: () => void; // Start the timer
  pause: () => void; // Pause the timer
  reset: (newTime?: number) => void; // Reset the timer (optional new time)
}

const useTimer = ({
  initialTime,
  onFinish,
}: UseTimerOptions): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const minutes = Math.floor(time / 60); // Calculate minutes
  const seconds = time % 60; // Calculate seconds

  // Start the timer
  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Pause the timer
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset the timer (with an optional new time)
  const reset = useCallback(
    (newTime?: number) => {
      setIsRunning(false);
      setTime(newTime ?? initialTime);
    },
    [initialTime]
  );

  // Handle timer countdown
  useEffect(() => {
    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (time === 0 && isRunning) {
      setIsRunning(false);
      if (onFinish) {
        onFinish(); // Call the onFinish callback
      } else {
        alert("Timer finished!"); // Default alert if no callback is provided
      }
    }
  }, [isRunning, time, onFinish]);

  return { time, minutes, seconds, isRunning, start, pause, reset };
};

export default useTimer;

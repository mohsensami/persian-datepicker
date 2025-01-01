import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store the current value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      // If item exists in localStorage, parse it, otherwise use the initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  // Function to update localStorage and the state
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;

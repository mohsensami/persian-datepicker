import { useState, useEffect, useCallback } from "react";

type UseDarkModeReturnType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  enableDarkMode: () => void;
  disableDarkMode: () => void;
};

const useDarkMode = (): UseDarkModeReturnType => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check localStorage for existing preference, otherwise default to system preference
    const storedPreference = localStorage.getItem("dark-mode");
    if (storedPreference !== null) {
      return storedPreference === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply the theme to the document body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }

    // Save the preference to localStorage
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Handlers to toggle, enable, or disable dark mode
  const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const enableDarkMode = useCallback(() => setIsDarkMode(true), []);
  const disableDarkMode = useCallback(() => setIsDarkMode(false), []);

  return {
    isDarkMode,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode,
  };
};

export default useDarkMode;

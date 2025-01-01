import { useRef } from "react";
import useDarkMode from "../hooks/useDarkMode";
import "../styles.css";

export default function Dark() {
  const { isDarkMode, toggleDarkMode, enableDarkMode, disableDarkMode } =
    useDarkMode();

  return (
    <div className="App">
      <div>
        <h1>Dark Mode Example</h1>
        <p>Current Mode: {isDarkMode ? "Dark" : "Light"}</p>
        <button onClick={toggleDarkMode}>
          Toggle {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div style={{ marginTop: "10px" }}>
          <button onClick={enableDarkMode}>Enable Dark Mode</button>
          <button onClick={disableDarkMode} style={{ marginLeft: "5px" }}>
            Disable Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
}

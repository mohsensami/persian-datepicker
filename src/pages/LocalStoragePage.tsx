import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const LocalStoragePage: React.FC = () => {
  const [name, setName] = useLocalStorage<string>("name", "John Doe");
  const [count, setCount] = useLocalStorage<number>("count", 0);

  return (
    <div>
      <h1>Custom useLocalStorage Hook Example</h1>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <p>Stored Name: {name}</p>
      </div>

      <div>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Increment Count
        </button>
        <button onClick={() => setCount(0)}>Reset Count</button>
        <p>Stored Count: {count}</p>
      </div>
    </div>
  );
};

export default LocalStoragePage;

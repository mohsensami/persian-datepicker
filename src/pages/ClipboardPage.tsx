import React from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const CopyExample: React.FC = () => {
  const { value, success, error, copyToClipboard } = useCopyToClipboard({
    resetAfterMs: 3000,
  });

  const handleCopy = (text: string) => {
    copyToClipboard(text);
  };

  return (
    <div>
      <h1>Copy to Clipboard Example</h1>

      <div>
        <button onClick={() => handleCopy("Hello, World!")}>
          Copy "Hello, World!"
        </button>
        <button onClick={() => handleCopy("Another Text!")}>
          Copy "Another Text!"
        </button>
      </div>

      {success && <p style={{ color: "green" }}>Copied: {value}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default CopyExample;

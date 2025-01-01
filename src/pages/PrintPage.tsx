import React from "react";
import { usePrint } from "../hooks/usePrint"; // Adjust the import based on your file structure

const PrintPage: React.FC = () => {
  const { printRef, triggerPrint } = usePrint();

  return (
    <div>
      <div ref={printRef} style={{ padding: "20px", background: "red" }}>
        Redddddd
      </div>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h1>Printable Content</h1>
        <p>This content will be printed when you click the button.</p>
      </div>
      <button onClick={triggerPrint}>Print</button>
    </div>
  );
};

export default PrintPage;

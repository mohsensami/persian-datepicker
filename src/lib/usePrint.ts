import { useRef } from "react";

export const usePrint = () => {
  const printRef = useRef<HTMLDivElement | null>(null);

  const triggerPrint = () => {
    if (printRef.current) {
      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;

      // Get the content to print
      const printContent = printRef.current.innerHTML;

      // Write the content to the new window
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              @media print {
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #333; }
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);

      // Close the document to ensure all content is loaded
      printWindow.document.close();

      // Wait for the content to load before printing
      printWindow.onload = () => {
        printWindow.print();
        // Close the window after printing
        printWindow.close();
      };
    }
  };

  return { printRef, triggerPrint };
};

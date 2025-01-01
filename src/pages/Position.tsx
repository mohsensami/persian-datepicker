import { useRef } from "react";
import useMousePosition from "../hooks/useMousePosition";
import "./styles.css";

export default function App() {
  const { position, attachMouseTracker, detachMouseTracker } =
    useMousePosition();
  const boxRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <hr />
      <div>
        <h1>Mouse Position Tracker</h1>
        <p>
          Mouse Position:{" "}
          <strong>
            X: {position.x}, Y: {position.y}
          </strong>
        </p>
        <div
          ref={boxRef}
          onMouseEnter={() => attachMouseTracker(boxRef.current)}
          onMouseLeave={detachMouseTracker}
          style={{
            width: "300px",
            height: "200px",
            border: "2px solid blue",
            margin: "20px 0",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <p style={{ textAlign: "center", marginTop: "80px" }}>
            Hover here to track relative mouse position
          </p>
        </div>
        <p>Hover outside the box to track global mouse position.</p>
      </div>
    </div>
  );
}

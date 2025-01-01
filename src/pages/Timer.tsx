import React from "react";
import useTimer from "../hooks/useTimer";

const TimerExample = () => {
  const { time, minutes, seconds, isRunning, start, pause, reset } = useTimer({
    initialTime: 90, // 1 minute 30 seconds
    onFinish: () => alert("Time's up!"),
  });

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>React Timer</h1>
      <p style={{ fontSize: "24px" }}>
        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <div>
        <button
          onClick={start}
          disabled={isRunning}
          style={{ marginRight: "10px" }}
        >
          Start
        </button>
        <button
          onClick={pause}
          disabled={!isRunning}
          style={{ marginRight: "10px" }}
        >
          Pause
        </button>
        <button onClick={() => reset()} style={{ marginRight: "10px" }}>
          Reset
        </button>
        <button onClick={() => reset(120)}>Set Timer to 2 Minutes</button>
      </div>
    </div>
  );
};

export default TimerExample;

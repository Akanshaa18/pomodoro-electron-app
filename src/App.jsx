import { useState, useEffect, useMemo, useRef } from "react";
import "./App.css";

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${mm}:${ss}`;
}

function notifySessionEnd(title, body) {
  console.log("notifySessionEnd called", title, body);
  if (window.electronAPI?.notifySessionEnd) {
    window.electronAPI.notifySessionEnd({ title, body });
  } else {
    console.error("electronAPI is undefined");
  }
}

const MODES = {
  focus: { label: "Focus Time", minutes: 25 },
  short: { label: "Short Break", minutes: 5 },
  long: { label: "Long Break", minutes: 15 },
};

function App() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [focusSessionsCompleted, setFocusSessionsCompleted] = useState(0);

  const intervalRef = useRef(null);
  const modeConfig = useMemo(() => MODES[mode], [mode]);

  useEffect(() => {
    setSecondsLeft(modeConfig.minutes * 60);
  }, [mode, modeConfig.minutes]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isRunning]);
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    if (secondsLeft > 0) {
      return;
    }
    setIsRunning(false);
    if (mode == "focus") {
      const count = focusSessionsCompleted + 1;
      const longBreak = count % 4 === 0;

      notifySessionEnd(
        "Focus session complete",
        longBreak
          ? "Nice work. Time for a long break."
          : "Nice work. Time for a short break.",
      );

      setFocusSessionsCompleted(count);
      setMode(longBreak ? "long" : "short");
    } else if (mode === "short") {
      notifySessionEnd(
        "Short break complete",
        "Break is over. Time to get back to focus.",
      );

      setMode("focus");
    } else {
      notifySessionEnd(
        "Long break complete",
        "Break is over. Time to get back to focus.",
      );

      setMode("focus");
    }
  }, [isRunning, mode, secondsLeft, focusSessionsCompleted]);

  function start() {
    if (secondsLeft <= 0) return;
    setIsRunning(true);
  }
  function pause() {
    setIsRunning(false);
  }
  function reset() {
    setIsRunning(false);
    setSecondsLeft(modeConfig.minutes * 60);
  }
  function setModeManually(nextMode) {
    setIsRunning(false);
    setMode(nextMode);
    setSecondsLeft(MODES[nextMode].minutes * 60);
  }
  return (
    <div className="page">
      <div className="card">
        <div className="modeRow">
          {Object.entries(MODES).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setModeManually(key)}
              className={`modeButton ${mode === key ? "modeButtonActive" : ""}`}
            >
              {cfg.label}
            </button>
          ))}
        </div>
        <div className="timer">{formatTime(secondsLeft)}</div>
        <div className="focusDots">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`dot ${i < focusSessionsCompleted % 4 ? "dotActive" : ""}`}
            />
          ))}
        </div>
        <div className="controls">
          {!isRunning ? (
            <button onClick={start} className="primary">
              Start
            </button>
          ) : (
            <button onClick={pause} className="primary">
              Pause
            </button>
          )}
          <button onClick={reset} className="secondary">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

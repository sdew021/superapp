import { useEffect, useState } from "react";

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [active, setIsActive] = useState(false);
  const [paused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval = null;
    if (active && !paused) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [active, paused]);

  const pauseResume = () => {
    setIsPaused(!paused);
  };
  const start = () => {
    setIsPaused(false);
    setIsActive(true);
  };
  const reset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div style={{ flexDirection: "row", padding: 10 }}>
      <TimeView time={time} />
      <button onClick={start}>START</button>
      {active && (
        <button onClick={pauseResume}>{!paused ? "PAUSE" : "RESUME"}</button>
      )}
      <button onClick={reset}>RESET</button>
    </div>
  );
};

// return time in the format 10h:02m:35s
const TimeView = (props) => {
  const time = props.time;
  return (
    <div>
      {Math.floor(time / 3600)}h:{Math.floor(time / 60) % 60}m:{time % 60}s
    </div>
  );
};

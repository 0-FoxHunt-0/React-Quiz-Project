import { useEffect } from "react";
import "./Timer.css";
import { ReducerActionType } from "../App/App";

interface TimerProps {
  dispatch: any;
  secondsRemaining: number;
}

function Timer({ dispatch, secondsRemaining }: TimerProps): JSX.Element {
  function formatTime(seconds: number) {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string = String(minutes).padStart(2, "0");
    const formattedSeconds: string = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: ReducerActionType.Tick });
    }, 1000);

    return () => clearInterval(timerId);
  }, [dispatch]);

  return <div className="Timer timer">{formatTime(secondsRemaining)}</div>;
}

export default Timer;

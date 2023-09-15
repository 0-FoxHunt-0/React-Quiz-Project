import { ReducerActionType } from "../App/App";
import "./FinishScreen.css";

interface FinishedScreenProps {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: any;
}

function FinishScreen({
  points,
  maxPoints,
  highscore,
  dispatch,
}: FinishedScreenProps): JSX.Element {
  const percentage = (points / maxPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🥈";
  else if (percentage >= 50 && percentage < 80) emoji = "🥉";
  else if (percentage >= 0 && percentage < 50) emoji = "🏅";
  else if (percentage === 0) emoji = "💩";

  return (
    <>
      <p className="FinishScreen result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ReducerActionType.Reset })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;

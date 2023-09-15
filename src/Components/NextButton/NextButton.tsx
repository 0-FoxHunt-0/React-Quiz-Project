import { ReducerActionType } from "../App/App";
import "./NextButton.css";

interface NextButtonProps {
  answer: number;
  dispatch: any;
  index: number;
  numOfQuestions: number;
}

function NextButton({
  answer,
  dispatch,
  index,
  numOfQuestions,
}: NextButtonProps): JSX.Element {
  if (answer === null) return;

  if (index < numOfQuestions - 1)
    return (
      <button
        className="NextButton btn btn-ui"
        onClick={() => dispatch({ type: ReducerActionType.NextQuestion })}
      >
        Next
      </button>
    );
  else
    return (
      <button
        className="NextButton btn btn-ui"
        onClick={() => dispatch({ type: ReducerActionType.Finished })}
      >
        Finish
      </button>
    );
}

export default NextButton;

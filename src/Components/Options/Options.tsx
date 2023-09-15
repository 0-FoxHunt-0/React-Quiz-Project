import QuestionModel from "../../Models/QuestionModel";
import { ReducerActionType } from "../App/App";
import "./Options.css";

interface OptionsProps {
  question: QuestionModel;
  dispatch: any;
  answer: number;
}

function Options({ question, dispatch, answer }: OptionsProps): JSX.Element {
  return (
    <div className="Options options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            answer !== null
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={i}
          disabled={answer !== null}
          onClick={() => {
            dispatch({ type: ReducerActionType.NewAnswer, payload: i });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

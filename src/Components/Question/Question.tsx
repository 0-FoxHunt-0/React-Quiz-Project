import { ReducerAction } from "react";
import QuestionModel from "../../Models/QuestionModel";
import Options from "../Options/Options";
import "./Question.css";

interface QuestionProps {
  question: QuestionModel;
  dispatchFOptions: any;
  answerFOptions: number;
}

function Question({
  question,
  dispatchFOptions,
  answerFOptions,
}: QuestionProps): JSX.Element {
  return (
    <div className="Question">
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatchFOptions}
        answer={answerFOptions}
      />
    </div>
  );
}

export default Question;

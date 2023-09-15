import axios from "axios";
import { useEffect, useReducer } from "react";
import QuestionModel from "../../Models/QuestionModel";
import ErrorMessage from "../Error/ErrorMessage";
import FinishScreen from "../FinishScreen/FinishScreen";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import Main from "../Main/Main";
import NextButton from "../NextButton/NextButton";
import Progress from "../Progress/Progress";
import Question from "../Question/Question";
import StartScreen from "../StartScreen/StartScreen";
import Timer from "../Timer/Timer";
import "./App.css";

export enum ReducerActionType {
  DataReceived = "dataReceived",
  Error = "dataFailed",
  StartQuiz = "startQuiz",
  Reset = "reset",
  NewAnswer = "newAnswer",
  NextQuestion = "nextQuestion",
  Finished = "finished",
  Tick = "tick",
}

type ReducerAction =
  | { type: ReducerActionType.DataReceived; payload: QuestionModel[] }
  | { type: ReducerActionType.Error }
  | { type: ReducerActionType.StartQuiz }
  | { type: ReducerActionType.Reset }
  | { type: ReducerActionType.NewAnswer; payload: number }
  | { type: ReducerActionType.NextQuestion }
  | { type: ReducerActionType.Finished }
  | { type: ReducerActionType.Tick };

enum StateStatus {
  Loading = "loading",
  Error = "error",
  Ready = "ready",
  Active = "active",
  Finished = "finished",
}

interface State {
  questions: QuestionModel[];
  status: StateStatus;
  index: number;
  answer: number;
  points: number;
  highscore: number;
  secondsRemaining: number;
}

const initialState: State = {
  questions: [],
  status: StateStatus.Loading,
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state: State, action: ReducerAction): State {
  switch (action.type) {
    case ReducerActionType.DataReceived:
      return {
        ...state,
        questions: action.payload,
        status: StateStatus.Ready,
        highscore:
          JSON.parse(localStorage.getItem("highscore")) ||
          initialState.highscore,
      };

    case ReducerActionType.Error:
      return { ...state, status: StateStatus.Error };

    case ReducerActionType.StartQuiz:
      return {
        ...state,
        status: StateStatus.Active,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case ReducerActionType.Reset:
      return {
        ...initialState,
        status: StateStatus.Ready,
        questions: state.questions,
        highscore: state.highscore,
      };

    case ReducerActionType.NewAnswer:
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case ReducerActionType.NextQuestion:
      return { ...state, index: state.index + 1, answer: null };

    case ReducerActionType.Finished:
      if (state.points > state.highscore)
        localStorage.setItem("highscore", JSON.stringify(state.points));

      return {
        ...state,
        status: StateStatus.Finished,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case ReducerActionType.Tick:
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status:
          state.secondsRemaining < 1 ? StateStatus.Finished : state.status,
      };

    default:
      throw new Error("Unknown Action");
  }
}

function App(): JSX.Element {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BIN_ID = process.env.REACT_APP_BIN_ID;

  useEffect(() => {
    // json-server request
    // axios
    //   .get("http://localhost:8000/questions")
    //   .then((res) => res.data)
    //   .then((data) =>
    //     dispatch({ type: ReducerActionType.DataReceived, payload: data })
    //   )
    //   .catch((err) => dispatch({ type: ReducerActionType.Error }));

    axios
      .get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          "X-Master-Key": API_KEY,
        },
      })
      .then((res) => res.data.record.questions)
      .then((data) =>
        dispatch({ type: ReducerActionType.DataReceived, payload: data })
      )
      .catch((err) => {
        console.error(err);
        dispatch({ type: ReducerActionType.Error });
      });
  }, [API_KEY, BIN_ID]);

  return (
    <div className="App app">
      <Header />
      <Main>
        {status === StateStatus.Loading && <Loader />}
        {status === StateStatus.Error && <ErrorMessage />}
        {status === StateStatus.Ready && (
          <StartScreen
            length={questions.length}
            onDispatch={() => dispatch({ type: ReducerActionType.StartQuiz })}
          />
        )}
        {status === StateStatus.Active && (
          <>
            <Progress
              index={index}
              numOfQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatchFOptions={dispatch}
              answerFOptions={answer}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={questions.length}
              />
            </footer>
          </>
        )}
        {status === StateStatus.Finished && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;

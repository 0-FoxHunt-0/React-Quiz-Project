import { useEffect, useReducer } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import axios from "axios";
import QuestionModel from "../../Models/QuestionModel";
import Loader from "../Loader/Loader";
import ErrorMessage from "../Error/ErrorMessage";
import StartScreen from "../StartScreen/StartScreen";

enum ReducerActionType {
  DataReceived = "dataReceived",
  Error = "dataFailed",
}

interface ReducerAction {
  type: ReducerActionType;
  payload?: QuestionModel[];
}

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
}

const initialState: State = { questions: [], status: StateStatus.Loading };

function reducer(state: State, action: ReducerAction): State {
  switch (action.type) {
    case ReducerActionType.DataReceived:
      return { ...state, questions: action.payload, status: StateStatus.Ready };
    case ReducerActionType.Error:
      return { ...state, status: StateStatus.Error };
    default:
      throw new Error("Unknown Action");
  }
}

function App(): JSX.Element {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const response = axios
      .get("http://localhost:8000/questions")
      .then((res) => res.data)
      .then((data) =>
        dispatch({ type: ReducerActionType.DataReceived, payload: data })
      )
      .catch((err) => dispatch({ type: ReducerActionType.Error }));
  }, []);

  return (
    <div className="App app">
      <Header />
      <Main>
        {status === StateStatus.Loading && <Loader />}
        {status === StateStatus.Error && <ErrorMessage />}
        {status === StateStatus.Ready && <StartScreen length={questions.length} />}
      </Main>
    </div>
  );
}

export default App;

import { ChangeEvent, useReducer } from "react";
import "./DateCounter.css";

interface State {
  count: number;
  step: number;
}

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setCount"; payload: number }
  | { type: "setSteps"; payload: number };

const initialState: State = { count: 0, step: 1 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.payload };
    case "setSteps":
      return { ...state, step: action.payload };
    default:
      console.log(state, action);
      throw new Error("Unknown operand");
  }
}

function DateCounter(): JSX.Element {
  const [{ count, step }, dispatch] = useReducer(reducer, initialState);

  // This mutates the date object.
  const date: Date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decrement" });
  };

  const inc = function () {
    dispatch({ type: "increment" });
  };

  const defineCount = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = function (e: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setSteps", payload: +e.target.value });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="DateCounter counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;

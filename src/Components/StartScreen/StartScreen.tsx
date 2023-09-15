import "./StartScreen.css";

interface StartScreenProps {
  length: number;
  onDispatch: () => void;
}

function StartScreen({ length, onDispatch }: StartScreenProps): JSX.Element {
  return (
    <div className="StartScreen start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={onDispatch}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;

import "./StartScreen.css";

interface StartScreenProps {
  length: number;
}

function StartScreen({ length }: StartScreenProps): JSX.Element {
  return (
    <div className="StartScreen start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{length} questions to test your React mastery</h3>
      <button className="btn">Let's start</button>
    </div>
  );
}

export default StartScreen;

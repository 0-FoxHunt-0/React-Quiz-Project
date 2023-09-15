import "./Progress.css";

interface ProgressProps {
  index: number;
  numOfQuestions: number;
  points: number;
  maxPoints: number;
  answer: number;
}

function Progress({
  index,
  numOfQuestions,
  points,
  maxPoints,
  answer,
}: ProgressProps): JSX.Element {
  return (
    <header className="Progress progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
}

export default Progress;

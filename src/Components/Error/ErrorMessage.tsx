import "./ErrorMessage.css";

function ErrorMessage(): JSX.Element {
  return (
    <p className="Error error">
      <span>💥</span> There was an error fetching questions.
    </p>
  );
}

export default ErrorMessage;

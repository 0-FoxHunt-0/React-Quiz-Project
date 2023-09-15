import "./Loader.css";

function Loader(): JSX.Element {
  return (
    <div className="Loader loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}

export default Loader;

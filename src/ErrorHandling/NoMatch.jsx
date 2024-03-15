import "./NoMatch.css";

export const NoMatch = () => {
  return (
    <div className="page-not-found">
      <h1 className="page-header">Page Not Found</h1>
      <button className="page-not-found-btn">
        <a href="/">Lets Go Home...</a>
      </button>
      <img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?t=st=1710516917~exp=1710520517~hmac=cc7b5ae7616208094f5cd733046de0339962553ceeb3e07fdd4d18230a891166&w=2000"
        alt="404 image - page not found"
      />
    </div>
  );
};

export default NoMatch;

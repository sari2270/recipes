import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1 className="display-4 text-center text-warning mt-5">OOPS</h1>;
      <h1 className="text-center text-warning">Something went wrong.</h1>
      <h1 className="text-center text-warning">You may be able to try again</h1>
      <h1 className="text-center text-warning">or back to</h1>
      <h5 className="text-center">
        <Link to="/" className="text-warning">
          homepage
        </Link>
      </h5>
    </>
  );
};

export default NotFound;

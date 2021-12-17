import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center mt-5 pt-5">
      <Spinner animation="border" variant="warning" className="text-center" />
    </div>
  );
};

export default Loading;

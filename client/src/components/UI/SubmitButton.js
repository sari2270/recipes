import { Button, Spinner } from "react-bootstrap";

import classes from "./SubmitButton.module.css";

const SubmitButton = ({
  children,
  onClick,
  isLoading,
  btnBG = "warning",
  btnText = "white",
}) => {
  return (
    <>
      <div className="text-center">
        <Button
          type="submit"
          onClick={onClick}
          variant={btnBG}
          className={`${classes["btn-size"]} my-4 rounded-pill text-${btnText}`}
        >
          {isLoading ? <Spinner animation="border" /> : children}
        </Button>
      </div>
    </>
  );
};

export default SubmitButton;

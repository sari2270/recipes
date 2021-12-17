import { useRef } from "react";
import {
  Form,
  FormControl,
  Button,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { GoSearch } from "react-icons/go";

import classes from "./SearchBox.module.css";

const SearchBox = ({ homepage = false }) => {
  const titleInputRef = useRef();
  const history = useHistory();

  const submitHandler = (e) => {
    const titleInput = titleInputRef.current.value;
    if (titleInput.trim().length == 0) return;
    history.push(`/search?q=${titleInput}`);
  };
  return (
    <>
      <div className={`${classes.searchbox} ${homepage && classes.homepage}`}>
        <Row className="justify-content-center">
          <Col xs={12} sm={12} md={6}>
            <Form>
              <InputGroup className="mb-3">
                <FormControl
                  ref={titleInputRef}
                  variant="outline-warning"
                  type="search"
                  placeholder="Find a Recipe..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <Button
                  variant="light"
                  className="text-warning"
                  id="button-addon2"
                  type="button"
                  onClick={submitHandler}
                >
                  <GoSearch />
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SearchBox;

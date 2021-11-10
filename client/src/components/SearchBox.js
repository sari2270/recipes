import { useRef } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";

import { GoSearch } from "react-icons/go";

const SearchBox = () => {
  const titleInputRef = useRef();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const titleInput = titleInputRef.current.value;
    if (titleInput.trim().length == 0) return;
    history.push(`/search?q=${titleInput}`);
  };
  return (
    <>
      <Form
        className="w-50 my-3 m-auto
         justify-content-center
        align-middle"
        onSubmit={submitHandler}
      >
            
        <InputGroup className="mb-3 border" >
          <FormControl
            ref={titleInputRef}
            variant="outline-warning"
            type="search"
            placeholder="Find a Recipe"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            className="border-0"
          />
          <Button
            variant="outline-warning"
            className="border-0"
            id="button-addon2"
            type="submit"
          >
            <GoSearch />
          </Button>
        </InputGroup>
      </Form>
    </>
  );
};

export default SearchBox;

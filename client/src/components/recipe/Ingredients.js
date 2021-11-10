import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { RiWhatsappFill } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import {
  FaMinusCircle,
  FaPlusCircle,
  FaPinterest,
  FaFacebook,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Ingredients = ({recipe}) => {

  const [wantedServings, setWantedServings] = useState(3);

  let ingredients = recipe.ingredients.map(
    ({ quantity, measuringUnit, ingredientName, state }, index) => (
      <Form.Check
        type="checkbox"
        key={index}
        variant="warning"
        label={
          <span>
            {/* {quantity != 0 && */}
            {quantity != 0 &&
              quantity != null &&
              ((wantedServings / recipe.servings) * quantity)
                .toFixed(2)
                .replace(/\.00$/, "")}{" "}
            {measuringUnit} {state} {ingredientName} 
          </span>
        }
      />
    )
  );

  const minusServings = () => {
    if (wantedServings > 1) {
      setWantedServings((prevWS) => prevWS - 1);
    }
  };
  const plusServings = () => {
    setWantedServings((prevWS) => prevWS + 1);
  };
  return (
    <>
      <hr />
      <h3>Ingredients</h3>
      <hr />
      <ListGroup variant="flush">
        <ListGroupItem>
          <div className="mb-3">
            <FaMinusCircle onClick={minusServings}>-</FaMinusCircle>
            <span>{wantedServings || recipe.servings}</span>
            <FaPlusCircle onClick={plusServings}>+</FaPlusCircle>
            servings |
            <Link to="/conversion" target="_blank">
              go to conversion
            </Link>
          </div>
          <div>{ingredients}</div>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default Ingredients;

import { Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { customQuantity } from "../../utils/helper";

const Ingredients = ({ recipe }) => {
  const [wantedServings, setWantedServings] = useState(recipe.servings);

  const ingredients = recipe.ingredients.map(
    ({ quantity, measuringUnit, ingredientName, state }, index) => (
      <Form.Check
        type="checkbox"
        key={index}
        label={
          <span>
            {quantity &&
              customQuantity(wantedServings, recipe.servings, quantity)}{" "}
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
            <button className="border-0 rounded-circle btn-light text-warning">
              <FaMinusCircle onClick={minusServings}>-</FaMinusCircle>
            </button>
            <span>{wantedServings || recipe.servings}</span>
            <button className="border-0 rounded-circle btn-light text-warning">
              <FaPlusCircle onClick={plusServings}>+</FaPlusCircle>
            </button>
            servings
          </div>
          <div>{ingredients}</div>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};

export default Ingredients;

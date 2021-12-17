import { Col, Row } from "react-bootstrap";
import Sorting from "../Sorting";
import CardItem from "./CardItem";

const Cards = ({ recipes, sortType, setSortType }) => {
  return (
    <>
      <Sorting sortType={sortType} setSortType={setSortType} />
      <Row xs={1} sm={1} md={4} className="g-4">
        {recipes.map((recipe, index) => (
          <Col key={index} className="my-3">
            <CardItem recipe={recipe} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cards;

import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardItem from "./CardItem";


const Cards = ({recipes}) => {

console.log("recipes", recipes);

  return (
    <>
      <Container>
        <Row xs={1} md={3}>
        {/* <Row xs={1} md={3} className="g-4"> */}
          {recipes.map((recipe, index) => (
            <Col key={index} className="my-3">
              <CardItem recipe={recipe} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Cards;

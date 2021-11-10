import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Figure, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Ingredients from "../components/recipe/Ingredients";
import Instructions from "../components/recipe/Instructions";

const baseUrl = process.env.REACT_APP_BASE_URL;

const RecipePage = () => {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const fetchSingleRecipeHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response =await axios.get(`${baseUrl}/recipes/${params.recipeId}`);        
      setRecipe(response.data);
      console.log(1111,response);
    } catch (error) {
      console.log("errorrrr");
    }
    setIsLoading(false);

  };
  useEffect(() => {
    fetchSingleRecipeHandler();
  }, []);

  console.log(recipe);
  if (isLoading) {
    return <h1>Loading</h1>
  }
  return (
    <>
      <Image src={recipe.imgUrl} height="400px" width="100%" alt={"alt"} />
      <Figure.Caption>
        {recipe.title} (photographer: {recipe.photographer})
      </Figure.Caption>
      <Container>
          <Row>
              <h2>{recipe.title}</h2>
              <Link to={recipe.source_url} target="_blank"><h5>{recipe.source_name}</h5></Link>
              </Row>
        <Row>
          <Col xs={12} md={5}>
            <Ingredients recipe={recipe}/>
          </Col>
          <Col xs={12} md={7}>
            <Instructions instructions={recipe.instructions}/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipePage;

import { Col, Container, Figure, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import Ingredients from "../components/recipe/Ingredients";
import Instructions from "../components/recipe/Instructions";
import Loading from "../components/UI/Loading";
import RecipesNotFound from "../components/UI/RecipesNotFound";
import Title from "../components/UI/Title";
import { AiFillPrinter } from "react-icons/ai";
import useFetch from "../hooks/useFetch";
import NotFound from "./NotFound";

const RecipePage = () => {
  const { recipeId } = useParams();

  const url = `recipes/${recipeId}`;

  const options = {
    method: "GET",
  };
  const { isLoading, error, data } = useFetch(url, options);
  const recipe = data;

  if (error) return <NotFound />;
  if (isLoading || !recipe) return <Loading />;
  if (!isLoading && !error && recipe.length === 0)
    return <RecipesNotFound single={true} />;

  return (
    <>
      <Image
        src={recipe.imgUrl}
        height="400px"
        width="100%"
        alt={"recipeImg"}
      />
      <Figure.Caption>
        {recipe.title} (photographer: {recipe.photographer})
      </Figure.Caption>
      <Container>
        <Row>
          <Title>
            <div>{recipe.title}</div>
            <a href={recipe.sourceUrl} target="_blank">
              <h5 className="text-warning">{recipe.sourceName}</h5>
            </a>
          </Title>
        </Row>
        <Row className="text-center">
          <Col>
            <h4>{recipe.description}</h4>
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={11} className="text-warning">
            {recipe.prepTime} | {recipe.views} views |
            {new Date(recipe.createdAt).toLocaleDateString("en-US")}
          </Col>
          <Col xs={1}>
            <a
              className="text-warning fs-4"
              id="print-recipe"
              data-article="126457"
              href="javascript:window.print();"
            >
              <AiFillPrinter />
            </a>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={5}>
            <Ingredients recipe={recipe} />
          </Col>
          <Col xs={12} md={7}>
            <Instructions instructions={recipe.instructions} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipePage;

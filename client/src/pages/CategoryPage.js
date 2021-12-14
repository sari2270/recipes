import { useParams } from "react-router";
import Cards from "../components/card/Cards";
import Loading from "../components/UI/Loading";
import Title from "../components/UI/Title";
import RecipesNotFound from "../components/UI/RecipesNotFound";
import useFetch from "../hooks/useFetch";
import { Container, Row } from "react-bootstrap";
import { useState } from "react";
import NotFound from "./NotFound";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [sortType, setSortType] = useState("createdAt");
  const url = `recipes/categories/${categoryName}?sort=${sortType}`;

  const options = {
    method: "GET",
  };
  const { isLoading, error, data } = useFetch(url, options, [
    categoryName,
    sortType,
  ]);
  const recipes = data?.recipes;

  if (error) return <NotFound />;
  if (isLoading || !recipes) return <Loading />;
  if (!isLoading && recipes.length === 0) return <RecipesNotFound />;

  return (
    <>
      <Container>
        <Row>
          <Title>{categoryName}</Title>
        </Row>
        <Cards
          recipes={recipes}
          sortType={sortType}
          setSortType={setSortType}
        />
      </Container>
    </>
  );
};

export default CategoryPage;

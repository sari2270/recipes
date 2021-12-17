import { useState } from "react";
import Cards from "../components/card/Cards";
import HeaderCard from "../components/UI/HeaderCard";
import SearchBox from "../components/SearchBox";
import Loading from "../components/UI/Loading";
import RecipesNotFound from "../components/UI/RecipesNotFound";
import useFetch from "../hooks/useFetch";
import { Container } from "react-bootstrap";
import NotFound from "./NotFound";

const Homepage = () => {
  const [sortType, setSortType] = useState("createdAt");
  const url = `recipes?sort=${sortType}`;

  const options = {
    method: "GET",
  };
  const { isLoading, error, data } = useFetch(url, options, [sortType]);
  const recipes = data?.recipes;

  if (error) return <NotFound/>;
  if (isLoading || !recipes) return <Loading />;
  if (!isLoading && recipes.length === 0) return <RecipesNotFound />;

  return (
    <>
      <HeaderCard />
      <Container>
        <SearchBox homepage={true} />
        <Cards
          recipes={recipes}
          sortType={sortType}
          setSortType={setSortType}
        />
      </Container>
    </>
  );
};

export default Homepage;

import { useLocation } from "react-router";
import Cards from "../components/card/Cards";
import SearchBox from "../components/SearchBox";
import Loading from "../components/UI/Loading";
import RecipesNotFound from "../components/UI/RecipesNotFound";
import useFetch from "../hooks/useFetch";
import NotFound from "./NotFound";

const SearchResults = () => {
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("q");
  const url = `recipes/search?q=${searchQuery}`;
  const options = {
    method: "GET",
  };
  const { isLoading, error, data } = useFetch(url, options, [searchQuery]);
  const recipes = data?.recipes;
  const total = data?.total;

  if (error) return <NotFound />;
  if (isLoading || !recipes) return <Loading />;
  if (!isLoading && recipes.length === 0) return <RecipesNotFound />;

  return (
    <>
      <SearchBox />
      <div className="my-5">
        <h1 className="text-center text-warning">
          <span>{total}</span> suggested recipes for: "{searchQuery}"
        </h1>
      </div>
      <Cards recipes={recipes} />
    </>
  );
};

export default SearchResults;

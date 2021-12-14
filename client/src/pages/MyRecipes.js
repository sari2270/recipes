import { useContext } from "react";
import Cards from "../components/card/Cards";
import AuthContext from "../store/auth-context";
import Loading from "../components/UI/Loading";
import RecipesNotFound from "../components/UI/RecipesNotFound";
import useFetch from "../hooks/useFetch";
import NotFound from "./NotFound";

const MyRecipes = () => {
  const authCtx = useContext(AuthContext);

  const url = `recipes/my-recipes`;

  const options = {
    method: "GET",
    body: { userId: authCtx.user.id },
    headers: { authorization: `bearer ${authCtx.user.accessToken}` },
  };
  const { isLoading, error, data } = useFetch(url, options);
  const recipes = data?.recipes;

  if (error) return <NotFound/>;
  if (isLoading || !recipes) return <Loading />;
  if (!isLoading && recipes.length === 0) return <RecipesNotFound />;

  return (
    <>
      <div>{authCtx.user.firstName}</div>
      <Cards recipes={recipes} />
    </>
  );
};

export default MyRecipes;

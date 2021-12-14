import { Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RecipePage from "./pages/RecipePage";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import MyRecipes from "./pages/MyRecipes";
import NotFound from "./pages/NotFound";

export const routes = [
  { path: "/", component: <Redirect to="/homepage" /> },
  { path: "/homepage", component: <Homepage /> },
  { path: "/search", component: <SearchResults /> },
  { path: "/recipes/:recipeId", component: <RecipePage /> },
  { path: "/category/:categoryName", component: <CategoryPage /> },
  { path: "/my-recipes", component: <MyRecipes /> },
  { path: "*", component: <NotFound /> },
];

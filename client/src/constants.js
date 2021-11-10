import { Redirect } from "react-router-dom";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Homepage from "./pages/Homepage";
import AddRecipeForm from "./components/addRecipe/AddRecipeForm";
import RecipePage from "./pages/RecipePage";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";

export const routes = [
  { path: "/", component: <Redirect to="/homepage" /> },
  { path: "/homepage", component: <Homepage /> },
  { path: "/register", component: <Register /> },
  { path: "/login", component: <Login /> },
  { path: "/edit-profile", component: <div>edit-profile</div> },
  { path: "/search", component: <SearchResults /> },
  { path: "/recipes/:recipeId", component: <RecipePage /> },
  { path: "/recipes/myRecipes", component: <div>myRecipes</div> },
  { path: "/category/:categoryName", component: <CategoryPage /> },
  { path: "/add-new-recipe", component: <AddRecipeForm /> },
  { path: "/edit-recipe/:recipeId", component: <div>edit recipe</div> },
  { path: "/conversion", component: <div>conversion and Scaling</div> },
  { path: "*", component: <div>404</div> },
];

export const navTitles = [
  { title: "All Recipes", path: "homepage" },
  { title: "Add a Recipe", path: "add-new-recipe" },
  { title: "Conversion and Scaling", path: "conversion" },
  { title: "Register", path: "register" },
  { title: "Login", path: "login" },
];

export const inputs = [
  { name: "prepTime", size: "4" },
  { name: "sourceName", size: "4" },
  { name: "title", size: "4" },
  { name: "description", size: "4" },
  { name: "servings", size: "4", type: "number" },
  { name: "imgUrl", size: "4", type: "url" },
  { name: "sourceUrl", size: "4", type: "url" },
  { name: "photographer", size: "4" },
];

export const inputsIngr = [
  { name: "quantity", size: "2", type: "number" },
  { name: "measuringUnit", size: "2" },
  { name: "state", size: "2" },
  { name: "ingredientName", size: "2" },
];

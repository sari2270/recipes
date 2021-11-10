import { useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import "./App.css";
import Navigation from "./components/layout/Navigation";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Homepage from "./pages/Homepage";
import AddRecipeForm from "./components/addRecipe/AddRecipeForm";
import RecipePage from "./pages/RecipePage";
import SearchResults from "./pages/SearchResults";
import AuthContext from "./store/auth-context";
import { routes } from "./constants";

function App() {
  const authCtx = useContext(AuthContext);

  const routesComponents = routes.map(({ path, component }, index) => (
    <Route exact path={path} key={index}>
      {component}
    </Route>
  ));
  return (
    <>
      <Navigation />
      <main>
        <Switch>{routesComponents}</Switch>
      </main>
    </>
  );
}

export default App;

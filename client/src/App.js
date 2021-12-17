import { Switch, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import { routes } from "./routes";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import AddRecipeForm from "./components/addRecipe/AddRecipeForm";
import ProtectedAuthRoute from "./components/layout/ProtectedAuthRoute";

function App() {
  const regularRoutes = routes.map(({ path, component }, index) => (
    <Route exact path={path} key={index}>
      {component}
    </Route>
  ));
  return (
    <>
      <Navigation />
      <main>
        <Switch>
          <ProtectedRoute
            component={AddRecipeForm}
            exact
            path={"/add-new-recipe"}
          />
          <ProtectedAuthRoute component={AuthPage} exact path={"/register"} />
          <ProtectedAuthRoute component={AuthPage} exact path={"/login"} />
          {regularRoutes}
        </Switch>
      </main>
    </>
  );
}

export default App;

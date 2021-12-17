import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const ProtectedAuthRoute = ({ component: Component, ...restOfProps }) => {
  const authCtx = useContext(AuthContext);
  const isAuthenticated = !!authCtx.isLoggedIn;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default ProtectedAuthRoute;

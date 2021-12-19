import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";
import { useContext } from "react";
import Loading from "../../components/UI/Loading";
import RecipesNotFound from "../../components/UI/RecipesNotFound";
import useFetch from "../../hooks/useFetch";
import { navTitles, userTitles } from "../../constants";
import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";
import NotFound from "../../pages/NotFound";

const Navigation = () => {
  const authCtx = useContext(AuthContext);

  const url = `recipes/categories`;

  const options = {
    method: "GET",
  };
  const { isLoading, error, data } = useFetch(url, options);
  const categories = data?.categories;

  const dropDownLinks = categories?.map(({ title }, index) => (
    <Link key={index} to={`/category/${title}`} className={classes.link}>
      {title}
    </Link>
  ));

  const navLinks = navTitles.map(({ title, path }, index) => (
    <CustomNavLink key={index} title={title} path={path} />
  ));

  if (error) return <NotFound />;
  if (isLoading || !categories) return <Loading />;
  if (!isLoading && categories.length === 0) return <RecipesNotFound />;

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
          <NavLink
            to="/"
            className={`${(classes.link, classes["app-title"])} text-warning`}
          >
            FOODIES
          </NavLink>
        </Nav>
        <Navbar.Collapse
          id="basic-navbar-nav"
          className=" justify-content-around"
        >
          <Nav>
            <NavDropdown
              title="Categories"
              id="basic-nav-dropdown"
              className={classes["dropdown-title"]}
            >
              <ul>{dropDownLinks}</ul>
            </NavDropdown>

            {navLinks.slice(0, -2)}
          </Nav>
        </Navbar.Collapse>

        {!authCtx.isLoggedIn && <Nav>{navLinks.slice(-2)}</Nav>}
        {authCtx.isLoggedIn && (
          <Nav>
            <span className="mx-2 text-warning">{`Hi ${authCtx.user.firstName},`}</span>

            <Link
              activeclassname={classes.active}
              className={classes.link}
              onClick={authCtx.logout}
              to={`/`}
            >
              {`Logout`}
            </Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;

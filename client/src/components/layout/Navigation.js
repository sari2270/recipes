import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";

import axios from "axios";
import { useState } from "react";

import { navTitles, UserNavTitles } from "../../constants";

import classes from "./Navigation.module.css";
import { useEffect } from "react";

const baseUrl = process.env.REACT_APP_BASE_URL;

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategoriesHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${baseUrl}recipes/categories`
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.log("errorrrr");
    }
  };
  useEffect(() => {
    fetchCategoriesHandler();
  }, []);

  const dropDownLinks = categories.map(({ title }, index) => (
    <li key={index}>
      <Link to={`/category/${title}`} className={classes.reset}>
        {title}
      </Link>
    </li>
  ));

  const navLinks = navTitles.map(({ title, path }, index) => (
    <CustomNavLink key={index} title={title} path={path} />
  ));
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className=" justify-content-between"
          >
            <Nav>
              <NavLink to="/" className={classes.link}>
                FOODIES
              </NavLink>
            </Nav>

            <Nav>
              <NavDropdown
                title="Categories"
                id="basic-nav-dropdown"
                className={classes.reset}
              >
                <ul className={classes.reset}>{dropDownLinks}</ul>
              </NavDropdown>

              {navLinks.slice(0, -2)}
            </Nav>

            <Nav>{navLinks.slice(-2)}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;

import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.module.css";

const CustomNavLink = ({ title, path }) => {
  return (
    <NavLink
      to={`/${path}`}
      activeClassName={classes.active}
      className={classes.link}
    >
      {title}
    </NavLink>
  );
};

export default CustomNavLink;

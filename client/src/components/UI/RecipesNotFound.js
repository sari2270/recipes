import React from "react";

const RecipesNotFound = ({ single = false }) => {
  const content = !single ? "recipes" : "recipe";
  return (
    <h1 className="text-center text-warning mt-5">{`No ${content} Found`}</h1>
  );
};

export default RecipesNotFound;

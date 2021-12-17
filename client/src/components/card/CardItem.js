import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";

import classes from "./CardItem.module.css";

const CardItem = ({ recipe }) => {
  return (
    <>
      <Card className="rounded-0">
        <Link to={`/recipes/${recipe._id}`}>
          <Card.Img
            className={`rounded-0 ${classes.img}`}
            variant="top"
            title={`${recipe.title} (photographer: ${recipe.photographer})`}
            src={recipe.imgUrl}
          />
        </Link>
        <Card.Body className="text-center">
          <Link to={`/recipes/${recipe._id}`}>
            <Card.Title className={`text-center ${classes.title}`}>
              {recipe.title}
            </Card.Title>
          </Link>
          <div className="bigger-font">
            <span>
              {recipe.views}
              <BsEye className="mx-1 a-white text-yellow" />
            </span>
          </div>
          <div className="bigger-font">
            <span>
              {new Date(recipe.createdAt).toLocaleDateString("en-US")}
            </span>
          </div>
          <div className="bigger-font "></div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CardItem;

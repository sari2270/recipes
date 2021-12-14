const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipe");
const recipeSchema = require("../validations/recipeSchema");
const verify = require("../middleware/verifyMiddleware");
const validation = require("../middleware/validationMiddleware");

router
  .get("/", recipeController.getRecipes)
  .post("/add-recipe", [verify, validation(recipeSchema)], recipeController.createRecipe)
  .get("/search", recipeController.getSearchRecipesByTitle)
  .get("/categories", recipeController.getCategories)
  .get("/categories/:categoryTitle", recipeController.getRecipesByCategory)
  .get("/my-recipes", verify, recipeController.getRecipesByUser)
  .get("/:recipeId", recipeController.getSingleRecipe);

module.exports = router;

const express = require("express");

const router = express.Router();

const recipeController = require("../controllers/recipe");

const validation = require("../middleware/validationMiddleware");
const recipeSchema = require("../validations/recipeValidation");

router.post("/add-recipe", validation(recipeSchema), recipeController.createRecipe);
router.get("/", recipeController.getRecipes);
router.get("/search", recipeController.getSearchRecipesByTitle);
router.get("/categories", recipeController.getCategories);
router.get("/:recipeId", recipeController.getSingleRecipe);

module.exports = router;

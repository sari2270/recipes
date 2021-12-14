const Recipe = require("../models/recipe");
const Category = require("../models/category");
const User = require("../models/user");

exports.getRecipes = async (req, res, next) => {
  try {
    let { sort } = req.query;
    const recipes = await Recipe.find().sort({ [sort]: -1 });
    res.status(200).json({
      recipes: recipes,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getRecipesByCategory = async (req, res, next) => {
  try {
    const recipes = await Category.findOne({ title: req.params.categoryTitle })
      .select("recipes")
      .populate("recipes");
    res.status(200).json({ recipes: recipes.recipes });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getRecipesByUser = async (req, res, next) => {
  try {
    const recipes = await User.findOne({ _id: req.body.userId })
      .select("recipes")
      .populate("recipes");
    res.status(200).json({ recipes: recipes.recipes });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.statusCode(500).json(error);
  }
};

exports.getSearchRecipesByTitle = async (req, res, next) => {
  try {
    const searchQuery = req.query.q.trim();
    if (searchQuery.length <= 1) {
      return res.status(403).json("Query must be at least 2 characters");
    }
    let { sort } = req.query;
    const recipes = await Recipe.find({
      title: { $regex: searchQuery },
    }).sort({ [sort]: -1 });
    res.status(200).json({ recipes, total: recipes.length });
  } catch (error) {
    res.statusCode(500).json(error);
  }
};

exports.getSingleRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { _id: req.params.recipeId },
      { $inc: { views: 1 } }
    );
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      userId,
      imgUrl,
      photographer,
      ingredients,
      instructions,
      prepTime,
      servings,
      description,
      sourceName,
      sourceUrl,
      categories,
    } = req.body;
    const recipe = await new Recipe({
      title,
      creator: userId,
      imgUrl,
      photographer,
      ingredients,
      instructions,
      prepTime,
      servings,
      description,
      sourceName,
      sourceUrl,
      categories,
    });
    await recipe.save();
    const user = await User.findById(userId);
    user.recipes.push(recipe);
    await user.save();
    for (const currCategory of recipe.categories) {
      const category = await Category.findOne({ title: currCategory });
      category.recipes.push(recipe._id);
      await category.save();
    }
    res.status(201).json({
      recipe: recipe,
      creator: { _id: user._id, name: user.name },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const Recipe = require("../models/recipe");
const Category = require("../models/category");
const User = require("../models/user");

exports.getRecipes = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;
  Recipe.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Recipe.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((recipes) => {
      res.status(200).json({
        message: "Fetches recipes successfully",
        recipes: recipes,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getCategories = (req, res, next) => {
  console.log(111111111111111111111);
  Category.find()
    .then((categories) => {
      res.status(200).json({categories});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getSearchRecipesByTitle = (req, res, next) => {
  Recipe.find({ title: { $regex: req.query.q.trim() } })
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return Recipe.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((recipes) => {
      res.status(200).json({
        message: "Fetches recipes successfully",
        recipes: recipes,
        totalItems: totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
exports.getSingleRecipe = (req, res, next) => {
  Recipe.findOneAndUpdate({ _id: req.params.recipeId }, { $inc: { views: 1 } })
    // Recipe.findById(req.params.recipeId)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getUpdateViews = (req, res, next) => {
  Recipe.findOneAndUpdate({ _id: res._id }, { $inc: { views: 1 } })
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createRecipe = (req, res, next) => {
  const {
    title,
    user,
    imgUrl,
    photographer,
    ingredients,
    instructions,
    prepTime,
    servings,
    description,
    sourceName,
    sourceUrl,
    difficulty,
    categories,
  } = req.body;
  let creator;
  const recipe = new Recipe({
    title,
    creator: "61832f8dbe0844faaf3cab41",
    // creator: req.userId,
    imgUrl,
    photographer,
    ingredients,
    instructions,
    prepTime,
    servings,
    description,
    sourceName,
    sourceUrl,
    difficulty,
    categories,
  });
  recipe
    .save()
    .then((result) => User.findById("61832f8dbe0844faaf3cab41"))
    // .then((result) => User.findById(req.userId))
    .then((user) => {
      creator = user;
      user.recipes.push(recipe);
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({
          message: "Recipe created successfully",
          recipe: recipe,
          creator: { _id: creator._id, name: creator.name },
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

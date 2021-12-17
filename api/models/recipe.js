const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    sourceName: {
      type: String,
      required: true,
    },
    sourceUrl: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    photographer: {
      type: String,
      required: true,
    },
    categories: [String],
    prepTime: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        quantity: { type: Number, required: false },
        measuringUnit: { type: String, required: false },
        state: { type: String, required: false },
        ingredientName: { type: String, required: true },
      },
    ],
    instructions: [{ id: String, instruction: String }],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);

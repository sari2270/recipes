const yup = require("yup");

const recipeSchema = yup.object({
  prepTime: yup
    .string()
    .required()
    .max(20),
  servings: yup
    .number()
    .required()
    .min(1)
    .max(20),
  title: yup
    .string()
    .required()
    .min(2)
    .max(40),
  sourceUrl: yup.string().nullable().url(),
  imgUrl: yup.string().required().url(),
  photographer: yup
    .string()
    .required()
    .min(2)
    .max(40),
  sourceName: yup
    .string()
    .required()
    .min(2)
    .max(30),
  description: yup.string().max(600),
});


module.exports = recipeSchema;

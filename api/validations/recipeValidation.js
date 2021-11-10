const yup = require("yup");

const recipeSchema = yup.object().shape({
  // const recipeSchema = yup.object()({
  prepTime: yup
    .string()
    .required("preptime reqqqqqqqq")
    .max(20, "too longgggggggg"),
  servings: yup
    .number()
    .required("servings reqqqqq")
    .min(1, "min 111111111")
    .max(20, "max 20000000"),
  title: yup
    .string()
    .required("שם המתכון נדרש")
    .min(2, "min 22222")
    .max(40, "max 40000000"),
  sourceUrl: yup.string().nullable().url(),
  imgUrl: yup.string().required().url(),
  photographer: yup
    .string()
    .required()
    .min(2, "min 22222")
    .max(40, "max 40000000"),
  sourceName: yup
    .string()
    .required()
    .min(2, "min 22222")
    .max(30, "max 40000000"),
  description: yup.string().max(600, "max 40000000"),
  // categories:'',
  // difficulty:'',
  //   terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
});

module.exports = recipeSchema;

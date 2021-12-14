export const navTitles = [
  { title: "All Recipes", path: "homepage" },
  { title: "Add a Recipe", path: "add-new-recipe" },
  { title: "Register", path: "register" },
  { title: "Login", path: "login" },
];

export const userTitles = [
  { title: "My Recipes", path: "my-recipes" },
  { title: "Edit Profile", path: "add-new-recipe" },
];

export const inputs = [
  {
    name: "prepTime",
    label: "Prep Time (words)",
    size: "12",
    isRequired: true,
  },
  {
    name: "servings",
    label: "Servings (number)",
    size: "12",
    type: "number",
    isRequired: true,
  },
  { name: "sourceName", label: "Source Name", size: "12", isRequired: true },
  { name: "title", size: "12", label: "Title", isRequired: true },
  { name: "description", label: "Description", size: "12", type: "textarea" },
  {
    name: "imgUrl",
    label: "Image Url",
    size: "12",
    type: "url",
    isRequired: true,
  },
  { name: "photographer", label: "Photographer", size: "12", isRequired: true },
  { name: "sourceUrl", label: "Source Url", size: "12", type: "url" },
];

export const inputsIngr = [
  { name: "quantity", label: "Quantity", size: "3", type: "number" },
  { name: "measuringUnit", label: "Measuring Unit", size: "3" },
  { name: "state", label: "State", size: "3" },
  { name: "ingredientName", label: "Ingredient", size: "3", isRequired: true },
];

export const registerInputs = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "email", label: "email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

export const loginInputs = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

const yup = require("yup");

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(2),
});

module.exports = loginSchema;
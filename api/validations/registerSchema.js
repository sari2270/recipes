const yup = require("yup");

const registerSchema = yup.object().shape({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

module.exports = registerSchema;
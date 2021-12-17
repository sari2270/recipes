const yup = require("yup");

const registerSchema = yup.object().shape({
    firstName: yup.string().required().min(2),
    lastName: yup.string().required().min(2),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    confirmPassword: yup
      .string()
      .required()
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup.string().oneOf([yup.ref("password"), null], 'Passwords must match'),
      }),
  });

export default registerSchema

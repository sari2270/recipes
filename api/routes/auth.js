const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const verify = require("../middleware/verifyMiddleware");
const validation = require("../middleware/validationMiddleware");
const loginSchema = require("../validations/loginSchema");
const registerSchema = require("../validations/registerSchema");

router
  .put("/register", validation(registerSchema), authController.register)
  .post("/login", validation(loginSchema), authController.login)
  .delete("/logout", verify, authController.logout)
  .post("/refresh", authController.refresh);

module.exports = router;

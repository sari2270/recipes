const express = require('express')

const router = express.Router()

const userController = require('../controllers/auth')
const authController = require('../controllers/auth')

const middleware = require('../middleware/index')

const validation = require("../middleware/validationMiddleware");
const loginSchema = require("../validations/loginValidation");
const registerSchema = require("../validations/registerValidation");

router.put('/register', validation(registerSchema), authController.register)
router.post('/login', validation(loginSchema), authController.login)
router.post('/refresh-token', validation(loginSchema), authController.generateRefreshToken)
router.delete('/logout', validation(loginSchema), authController.logout)
router.get('/protected-resource', middleware.checkAuth, (req,res)=>{
    return res.status(200).json({user: req.user})
})
// router.get('/:recipeId',recipeController.getSingleRecipe)

module.exports = router
const express = require('express');
const { body } = require('express-validator')
// const { body } = require('express-validator/check')

// const usersController = require('../controllers/users')

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST 
router.post('./post', )

module.exports = router;

const express = require('express');//
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require("dotenv").config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipeRoutes = require('./routes/recipe');
const authRoutes = require('./routes/auth');


const app = express();//


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipeRoutes);
app.use('/auth', authRoutes);


module.exports = app;

require('dotenv').config()
const config = require('./utils/config.js')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger.js')
const mongoose = require("mongoose");
const blogsRouter = require('./controllers/blogs.js');
const userRouter = require('./controllers/users.js');
const loginRouter = require('./controllers/login.js');
const middleware = require('./utils/middleware.js');

const mongoUrl = config.MONGODB_URI
logger.info(process.env.NODE_ENV);
logger.info('connecting to MongoDB', mongoUrl);
mongoose.connect(mongoUrl)
    .then(()=> {logger.info('connected to MongoDB')})
    .catch((err)=>{logger.error(err)})
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app;
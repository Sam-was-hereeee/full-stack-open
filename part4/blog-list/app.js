const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const mongoose = require("mongoose");
const blogsRouter = require('./controllers/blogs.js');

const mongoUrl = config.MONGODB_URI
logger.info('connecting to MongoDB')
mongoose.connect(mongoUrl)
    .then(()=>{logger.info('connected to MongoDB')})
    .catch((err)=>{logger.error(err)})

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require('express').Router();
const User = require('../models/users');
const logger = require('../utils/logger');
loginRouter.post('/', async (req, res) => {
    const { username, password} = req.body;
    const user = await User.findOne({userName: username});
    logger.info(user)
    if (!user) {
        return res.status(404).json({error: "no user with this username"})
    }
    const correctPassword = bcrypt.compare(password, user.passwordHash)
    if (!correctPassword) {
        return res.status(401).json({error: "wrong password"})
    }
    const userForToken = {
        username: user.userName,
        id: user._id
    }
    logger.info(userForToken)
    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({token, username: user.userName, id: user._id})
})
// example token for grant: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjY3NDgyOTN9.zPuioCg4_3h4VCegn9SCYKWj69LsnisFohuCbRXq5Go

module.exports = loginRouter
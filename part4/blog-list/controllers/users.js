const User = require('../models/users')
const bcrypt = require('bcrypt')
const userRouter = require("express").Router()


//the post method should receive three properties: password, username, and name
userRouter.post("/", async (req, res) => {
    const saltRounds = 12
    if (!req.body.password) {
        return res.status(400).json({error: "missing password"})
    }
    const passwordHash = await bcrypt.hash(req.body.password,saltRounds)
    if (req.body.userName.length<3 || req.body.password.length<3) {
        res.status(400).json({error: "username or password is too short"})
        return
    }
    const newUser = new User({
        userName: req.body.userName,
        name: req.body.name,
        passwordHash: passwordHash
    })
    const result = await newUser.save()
    res.status(201).json(result)
})

userRouter.get("/", async (req, res)=>{
    const allUser = await User.find({}).populate('blogs', {title:1, author:1, url: 1})
    res.json(allUser)
})

module.exports = userRouter
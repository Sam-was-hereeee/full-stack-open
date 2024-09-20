const Blog = require('../models/blogs');
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        user: "66ebdc335a774fbaab7918bf",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        user: "66ebdc335a774fbaab7918bf",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        user: "66ebdc335a774fbaab7918bf",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        user: "66ebdc335a774fbaab7918bf",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        user: "66ebdc335a774fbaab7918bf",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        user: "66ebdc335a774fbaab7918bf",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const initialUsers = [
    {
        _id: "66ebdc335a774fbaab7918bf",
        userName: "root",
        name: "root", // password is root
        passwordHash: "$2b$12$bUlGbqERK7KFVBz0ErKQLO3z96HNZx9t8L7/gc121ZmPzOwiKtA0y"
    },
    {
        _id: "66ebdc335a774fbaab7918c0",
        userName: "bob",
        name: "bob", // password is bob
        passwordHash: "$2b$12$ZxZyy7rCoyZmRx2Oa/pHqu/kqljhmtXL9DbU/LpCqj3gm/cqyk802"
    },
    {
        _id: "66ebdc335a774fbaab7918c1",
        userName: "grant",
        name: "grant", // password is grant
        passwordHash: "$2b$12$/7h72IlGGNEY.eyyMdH4euajFuSJWnQ2F80zsygaMVJ9VREgL8pje"
    }
]

// takes a user mongoose document and return a valid session token
const getValidToken = (user) => {
    const userForToken = {
        username: user.userName,
        id: user._id
    }
    logger.info('issuing token')
    return jwt.sign(userForToken, process.env.SECRET)
}

const getAllBlogs = async ()=>{
    const blogs = await Blog.find({}).exec()
    return blogs.map(blog => blog.toJSON());
}

module.exports = {
    initialUsers,
    initialBlogs,
    getAllBlogs,
    getValidToken
}
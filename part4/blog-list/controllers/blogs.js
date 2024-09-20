const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogs");
const User = require("../models/users");
const logger = require("../utils/logger");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {name:1, userName:1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const user = await User.findById(request.user.id)
    if (!user) {
        return response.status(401).json({error: "no user from the token"})
    }
    const blog = new Blog(request.body)
    blog.user = user._id
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = await User.findById(request.user.id)
    const target = await Blog.findById(request.params.id)
    if (!target || (target.user.toString()!==user._id.toString())) {
        return response.status(404).json({error: "wrong user or post"})
    }
    const deleted = await Blog.findByIdAndDelete(request.params.id).exec()
    if (!deleted) {
        response.status(404).end()
    }
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const newBlog = request.body
    await Blog.findByIdAndUpdate(id, newBlog, {new: true, runValidators:true})
    response.status(200).json(newBlog)
})

module.exports = blogsRouter;

// my choice: 1
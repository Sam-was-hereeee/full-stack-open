const assert = require('node:assert')
const {after, test, describe, beforeEach} = require('node:test')
const app = require('../app.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelper = require('./test_helper')

const api = supertest(app);
const Blog = require('../models/blogs');
const User = require('../models/users');

beforeEach(async () => {
    await Blog.deleteMany({})
    let promiseChain = testHelper.initialBlogs.map(blog=>
    {const newBlog = new Blog (blog); return newBlog.save()})
    await Promise.all(promiseChain)
    await User.deleteMany({})
    promiseChain = testHelper.initialUsers.map(user=>
    {const newUser = new User (user); return newUser.save()})
    await Promise.all(promiseChain)
})

describe('test GET', () => {
    test('get all blogs', async () => {
        const response = await api.get('/api/blogs').expect(200)
        const contents = response.body.map(e=>e.content)
        assert.strictEqual(contents.length, 6)
    })
})

describe('id is the identifier', ()=>{
    test('id of first blog exists', async () => {
        const blogs = await testHelper.getAllBlogs()
        assert(blogs.every((blog)=>blog.id))
    })
})

describe('post method with token', ()=>{
    test('post one', async () => {
        const user = await User.findById("66ebdc335a774fbaab7918bf") // root
        const token = testHelper.getValidToken(user)
        const newBlog = {
            title: "testing 123",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 3,
        }
        await api.post('/api/blogs')
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('content-type', /application\/json/)
        const newBlogCnt = await Blog.countDocuments().exec()
        assert(newBlogCnt === testHelper.initialBlogs.length + 1)
    })
    test('missing token', async ()=>{
        const user = await User.findById("66ebdc335a774fbaab7918bf") // root
        const newBlog = {
            title: "testing 123",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 3,
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)
        const newBlogCnt = await Blog.countDocuments().exec()
        assert(newBlogCnt === testHelper.initialBlogs.length)
    })
})

describe('missing properties', ()=>{
    const noLikeBlog = {
        title: "testing 1",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
    }
    const noTitleBlog = {
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 0
    }
    test('likes become zero', async ()=>{
        await api.post('/api/blogs').send(noLikeBlog)
            .expect(201).expect('content-type', /application\/json/)
        const createdBlog = await Blog.findOne({title: 'testing 1'}).exec()
        assert(createdBlog.likes === 0)
    })
    test('missing title', async ()=>{
        await api.post('/api/blogs').send(noTitleBlog)
            .expect(400)
    })
})

describe('delete method', ()=> {
    test('delete first', async ()=>{
        const firstItem = await Blog.findOne({})
        const creator = await User.findById(firstItem.user)
        const token = testHelper.getValidToken(creator)
        const firstId = firstItem.id
        await api.delete(`/api/blogs/${firstId}`)
            .set("Authorization", `Bearer ${token}`).expect(204)
    })
    test('delete undefined', async ()=>{
        const creator = await User.findOne({})
        const token = testHelper.getValidToken(creator)
        await api.delete('/api/blogs/5a422bc61b54a676234d17fd')
            .set("Authorization", `Bearer ${token}`)
            .expect(404)
    })
})

describe('put method', ()=>{
    test('put first', async ()=>{
        const oldItem = await Blog.findOne({title: "React patterns"})
        const id = oldItem._id
        console.log(id)
        const newItem = {
            title: "Updated",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 100
        }
        await api.put(`/api/blogs/${id}`).send(newItem)
            .expect(200)
        const uploaded = await Blog.findById(id).exec()
        assert(uploaded.likes===100 && uploaded.title==="Updated")
    })
})

// -----users-----

describe('create user', ()=>{
    test('create one user', async ()=>{
        const newUser = {
            userName: "test",
            name: "test",
            password: "test"
        }
        await api.post('/api/users').send(newUser).expect(201).expect('content-type', /application\/json/)
        const foundUser = await User.find({name:"test"})
        assert(foundUser)
    })
    test('username too short', async ()=>{
        const newUser = {
            userName: "te",
            name: "test",
            password: "test"
        }
        await api.post('/api/users').send(newUser)
            .expect(400)
    })
    test('missing password', async ()=>{
        const newUser = {
            userName: "test",
            name: "test"
        }
        await api.post('/api/users').send(newUser).expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})
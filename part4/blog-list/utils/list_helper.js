const lodash = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, current) => {return acc+current.likes}, 0);
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce((acc, current) => {return acc.likes<current.likes?current : acc}, {likes:0});
    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const blogCntObj = lodash.countBy(blogs, blog => {return blog.author})
    const resultArr = lodash.maxBy(Object.entries(blogCntObj),
        ([_key, value])=>{return value})
    return {author: resultArr[0], blogs: resultArr[1]};
}

const mostLikes = (blogs) => {
    const likeCntObj = {}
    for (const blog of blogs) {
        likeCntObj[blog.author] = (likeCntObj[blog.author] || 0) + blog.likes;
    }
    const resultArr = lodash.maxBy(Object.entries(likeCntObj), ([_key, value]) => {return value})
    return {author : resultArr[0], likes : resultArr[1]};
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs , mostLikes};
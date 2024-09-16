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
    return lodash.transform(
        lodash.countBy(blogs, blog => {return blog.author}),
        (acc, authorCnt, author)=>
        {return acc.blogs < authorCnt ? {author: author, blogs: authorCnt} : acc}, {author: "a", blogs:0})
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}

const dummy = (blogs) => {
    return Number(1)
} 

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce((x,y) => x+y, 0)
}

const favoriteBlog = (blogs) => {
    let fav = blogs[0]
    blogs.map(blog => {
        if (blog.likes > fav.likes) fav = blog
    })
    return fav.id
}
/*
const lodash = require('lodash')

const mostBlogs = (blogs) => {
    let grouped = lodash.reduce(blogs, (x, y) => {
        (x[y.author] || (x[y.author] = [])).push(y)  
        return x
    }, {})

}
*/

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
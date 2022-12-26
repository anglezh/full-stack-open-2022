const Blog = require('../models/note')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  if (blogs === undefined || blogs === null) {
    return 0
  }

  return blogs.map(blog => blog.likes).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs === null || blogs.length < 1) {
    return {}
  }
  return blogs.reduce((pre, cur) => cur.likes > pre.likes ? cur : pre)
}

const mostBlogs = (blogs) => {
  counts = {}
  blogs.map(blog => blog.author).forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  return counts
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
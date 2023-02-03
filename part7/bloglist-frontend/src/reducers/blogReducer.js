import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    toggleLikeUpdate(state, action) {
      const updateBlog = action.payload
      return state.map(blog => updateBlog.id === blog.id ? updateBlog : blog)
    },
    commentBlog(state, action) {
      const commentBlog = action.payload
      return state.map(blog => commentBlog.id === blog.id ? commentBlog : blog)
    },
    removedBlog(state, action) {
      state.pop(action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.log(error)
    }
  }
}

export const toggleLikeOf = (changeBlog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.likes(changeBlog)
      updatedBlog.user = changeBlog.user
      dispatch(toggleLikeUpdate(updatedBlog))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeBlogOf = (blog) => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      console.log(`remove ${blog.id}----${blog.title}`)
      try {
        const response = await blogService.remove(blog.id)
        console.log(response)
        dispatch(removedBlog(blog))
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const commentBlogOf = (comment, blog) => {
  return async dispatch => {
    // await blogService.comment(comment, blog)
    // blog.comments = []
    // blog.comments.concat(comment)
    // const commnetOfBlog = { ...blog, comments: blog.comments.concat(comment) }
    // await blogService.comment(commnetOfBlog)
    const commnetOfBlog = { ...blog, comment: comment }
    const updateBlog = await blogService.comment(commnetOfBlog)
    updateBlog.user = blog.user
    console.log(updateBlog)
    dispatch(commentBlog(updateBlog))
  }
}
export const { appendBlog, setBlogs, toggleLikeUpdate, removedBlog, commentBlog } = blogSlice.actions
export default blogSlice.reducer
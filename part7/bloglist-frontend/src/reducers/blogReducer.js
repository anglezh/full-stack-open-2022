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

export const toggleLikeOf = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.likes(blog)
      updatedBlog.user = blog.user
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
export const { appendBlog, setBlogs, toggleLikeUpdate, removedBlog } = blogSlice.actions
export default blogSlice.reducer
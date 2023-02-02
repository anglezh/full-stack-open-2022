import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
// import loginService from './services/login'

import Notification from './components/Notification'
import BlogList from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Login from './components/loginForm'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'
import { appendBlog } from './reducers/blogReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector(({ userInfo }) => { return userInfo })

  useEffect(() => {
    dispatch(getUser())
    dispatch(initializeBlogs())
  }, [])

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then((savedBlog) => {
        dispatch(setNotification(`a new blog ${savedBlog.title} added`, 5))
        savedBlog.user = user
        dispatch(appendBlog(savedBlog))
      })
      .catch((error) => {
        dispatch(setNotification(error.message, 5))
        console.log(error.message)
      })
  }
  if (user === null) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <h2>blogs</h2>
        <User />
        <div>
          <Togglable buttonLabel='new note' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <BlogList />
        </div>
      </div>
    )
  }
}

export default App

import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/loginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      sortBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
      delayedHide('Wrong credentials', 5000)
    }

  }
  const delayedHide = (message, timeout) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, timeout)
  }
  const logout = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlog)
      .then(savedBlog => {
        sortBlogs(blogs.concat(savedBlog))
        delayedHide(`a new blog ${savedBlog.title} added`, 5000)
      })
      .catch(error => {
        delayedHide(error.message, 5000)
      })
  }

  const toggleLikeOf = async blog => {
    // console.log(blog)
    const response = await blogService.likes(blog)
    const updateBlogs = blogs.map(blog => blog.id === response.id ? response : blog)
    sortBlogs(updateBlogs)
  }
  const removeBlogOf = async blog => {

    if (window.confirm(`Remove blog ${blog.title}`)) {
      console.log(`remove ${blog.id}----${blog.title}`)
      const response = await blogService.remove(blog.id)
      console.log(response)
      window.location.reload()
    }
  }
  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)} />
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={message} />
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
        <div>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} toggleLike={() => { toggleLikeOf(blog) }} removeBlog={() => { removeBlogOf(blog) }} username={user?.username} />
            )
          }
        </div>
      </div>)

  }


}

export default App

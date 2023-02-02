import { useEffect, useRef } from 'react'
import blogService from './services/blogs'

import Notification from './components/Notification'
import BlogList from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Login from './components/loginForm'
import User from './components/User'
import UsersPage from './components/UsersPage'
import UserInfoPage from './components/UserInfoPage'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'
import { appendBlog } from './reducers/blogReducer'
import { getAllUsers } from './reducers/allUsersReducer'
import { Route, Routes, useMatch } from 'react-router-dom'

const HomePage = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector(({ userInfo }) => { return userInfo })

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

  return (
    <div>
      <Notification />
      <div>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <BlogList />
      </div>
    </div>
  )
}



const App = () => {

  const match = useMatch('/users/:id')
  const dispatch = useDispatch()
  const users = useSelector(({ allUsers }) => { return allUsers })

  const user = match ? users.find(user => user.id === match.params.id) : null

  const loginUser = useSelector(({ userInfo }) => { return userInfo })

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getUser())
    dispatch(initializeBlogs())
  }, [])
  if (loginUser === null) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }

  return (

    <div>
      <h2>blogs</h2>
      <User />
      <div>
        <Routes>
          <Route path='/users/:id' element={<UserInfoPage user={user} />}></Route>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/users' element={<UsersPage users={users} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App

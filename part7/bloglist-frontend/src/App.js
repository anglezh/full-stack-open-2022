import { useEffect } from 'react'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Login from './components/loginForm'
import User from './components/User'
import UsersPage from './components/UsersPage'
import UserInfoPage from './components/UserInfoPage'
import BlogInfoPage from './components/BlogInfoPage'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/userReducer'
import { getAllUsers } from './reducers/allUsersReducer'
import { Route, Routes, useMatch } from 'react-router-dom'


const App = () => {

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const users = useSelector(({ allUsers }) => { return allUsers })
  const blogs = useSelector(({ blogs }) => { return blogs })

  const user = matchUser ? users.find(user => user.id === matchUser.params.id) : null
  const blog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null

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
          <Route path='/' element={<BlogList />}></Route>
          <Route path='/users' element={<UsersPage users={users} />}></Route>
          <Route path='/users/:id' element={<UserInfoPage user={user} />}></Route>
          <Route path='/blogs/:id' element={<BlogInfoPage blog={blog} />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App

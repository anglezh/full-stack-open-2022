import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ userInfo }) => {
    return userInfo
  })
  const logout = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(saveUser(null))
  }
  const padding = {
    paddingRight: 5
  }

  return (
    <p>
      <Link style={padding} to={'/users'}>users</Link>
      <Link style={padding} to={'/'}>blogs</Link>
      {user?.name} logged in <button onClick={logout}>logout</button>
    </p>
  )
}

export default User
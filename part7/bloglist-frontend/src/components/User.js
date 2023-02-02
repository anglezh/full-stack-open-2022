import { useSelector, useDispatch } from 'react-redux'
import { saveUser } from '../reducers/userReducer'

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

  return (
    <p>
      {user?.name} logged in <button onClick={logout}>logout</button>
    </p>
  )
}

export default User
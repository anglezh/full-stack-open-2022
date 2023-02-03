import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { saveUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import Notification from '../components/Notification'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      if (user) {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(saveUser(user))
        dispatch(setNotification(`Welcome ${user.username}`, 'success', 5))
        setUsername('')
        setPassword('')
      }
    } catch (error) {
      console.log(error)
      dispatch(setNotification('Wrong credentials', 'danger', 5))
    }
  }
  return (
    <div className='container'>
      <Notification />
      <h2>log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => { setUsername(target.value) }}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={({ target }) => { setPassword(target.value) }}
          />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>

    </div>
  )
}

export default Login

import { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = (props) => {
  const [username, setUserName] = useState('zhaoqin')
  const [password, setPassword] = useState('secret')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      // console.log(error)
      props.setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('library-user-token', token)
      props.setToken(token)
    }
  }, [result.data])// eslint-disable-line

  const submit = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input value={username} onChange={({ target }) => setUserName(target.value)}></input>
        </div>
        <div>
          password
          <input value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
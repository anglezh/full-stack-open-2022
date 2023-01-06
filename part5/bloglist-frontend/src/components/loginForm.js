

const loginForm = ({ handleSubmit, username, password, handleUsernameChange, handlePasswordChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <h2>log in to application</h2>
      username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type='submit'>login</button>
  </form>

)

export default loginForm
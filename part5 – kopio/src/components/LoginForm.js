import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ( { handleLogin, userName, setUserName, password, setPassword } ) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login" type="submit">login</button>
    </form>      
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setUserName: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
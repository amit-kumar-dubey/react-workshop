import React, { Fragment, useState } from 'react'
import { FormField, Heading, Notice, Centered } from 'workshop'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { login } from '../utils/localStorage'
import useAuth from '../hooks/useAuth'
import api from '../api'

function Login({ history }) {
  const { dispatch } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLogin(event) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then(user => {
        login(user)
        dispatch({ type: 'LOGIN', user })
        history.push('/')
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }

  return (
    <Centered>
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && <Notice type="error">{error}</Notice>}
        <FormField
          name="username"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <FormField
          name="password"
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <footer>
          <button type="submit" className="button">
            {!loading ? (
              <Fragment>
                <MdKeyboardArrowRight /> <span>Submit</span>
              </Fragment>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default Login

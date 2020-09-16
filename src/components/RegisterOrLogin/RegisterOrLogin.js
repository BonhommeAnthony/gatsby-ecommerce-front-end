import React, { useState, useContext } from "react"

import "./RegisterOrLogin.css"

import { UserContext } from "../../context/userContext"

const RegisterOrLogin = () => {
  const { registerUser, loginUser } = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("Login")

  const handlerSubmit = e => {
    e.preventDefault()

    const data = {
      username,
      email,
      password,
    }

    // signIn user with strapi
    if (mode === "Register") {
      registerUser(data)
    } else if (mode === "Login") {
      loginUser(data)
    }
  }

  return (
    <div className="registerOrLogin">
      <h1>{mode}</h1>
      <form onSubmit={handlerSubmit}>
        {mode === "Register" ? (
          <>
            <input
              placeholder="username"
              onChange={e => setUsername(e.target.value)}
              type="text"
              name="username"
              value={username}
              id="username"
            />
          </>
        ) : null}
        <br />

        <input
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
          type="email"
          name="email"
          value={email}
          id="email"
        />
        <br />
        <input
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
          type="password"
          name="password"
          value={password}
          id="password"
        />
        <br />
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
      {mode === "Login" ? (
        <button className="btn" onClick={() => setMode("Register")}>
          Want to Register ?
        </button>
      ) : (
        <button className="btn" onClick={() => setMode("Login")}>
          Want to Login ?
        </button>
      )}
    </div>
  )
}

export default RegisterOrLogin

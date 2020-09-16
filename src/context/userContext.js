import React, { createContext, useState, useContext } from "react"
import axios from "axios"
import { navigate } from "gatsby"

export const UserContext = createContext(null)

export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [auth, setAuth] = useState("")

  const registerUser = async data => {
    const userCreationRes = await axios({
      method: "POST",
      url: "http://localhost:1337/auth/local/register",
      data,
    })
    console.log("userContext userCreationRes", userCreationRes)
    setUser(userCreationRes)
  }
  const loginUser = async data => {
    const { email, password, username } = data
    const loginCreationRes = await axios({
      method: "POST",
      url: "http://localhost:1337/auth/local",
      data: {
        identifier: email,
        password: password,
      },
    }).catch(error => {
      console.log("login error", error)
    })

    console.log("userContext loginCreationRes.status", loginCreationRes)
    navigate("/")
    setUser(loginCreationRes)
  }

  const logoutUser = async () => {
    setUser(null)

    const deleteCookie = await axios({
      method: "POST",
      url: "http://localhost:1337/logout",
    })
  }

  return (
    <UserContext.Provider value={{ registerUser, loginUser, user, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

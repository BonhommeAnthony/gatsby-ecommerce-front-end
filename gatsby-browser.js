import React from "react"
import CartContextProvider from "./src/context/cartContext"
import UserContextProvider from "./src/context/userContext"

export const wrapRootElement = ({ element }) => (
  <UserContextProvider>
    <CartContextProvider>{element}</CartContextProvider>
  </UserContextProvider>
)

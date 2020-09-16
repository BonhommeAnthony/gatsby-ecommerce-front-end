import React, { createContext, useState } from "react"
import { getCart, saveCart } from "../utils/cart"

export const CartContext = createContext(null)

export default ({ children }) => {
  const [cart, setCart] = useState(getCart())

  const updateCart = updatedCart => {
    setCart(updatedCart)
    saveCart(updatedCart)
  }

  const addToCart = (product, qty = 1) => {
    const copy = [...cart]
    // if the product is already there
    const indexOfProduct = cart.findIndex(
      alreadyInCart => alreadyInCart.strapiId === product.strapiId
    )
    if (indexOfProduct !== -1) {
      //Update the quantity
      copy[indexOfProduct].qty += parseInt(qty)

      if (copy[indexOfProduct].qty === 0) {
        //Remove the product from the cart
        copy.splice(indexOfProduct, 1)
      }
    } else {
      //Set quantity to 1
      product.qty = parseInt(qty)
      //Push the product
      copy.push(product)
    }

    updateCart(copy)
  }

  const clearCart = () => {
    const updatedCart = []
    updateCart(updatedCart)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

import React, { useState, useCallback, useContext } from "react"

import { CartContext } from "../context/cartContext"

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Checkout from "../components/Checkout"

import {
  cartSubtotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../utils/cart"
import { formatPrice } from "../utils/format"
import CartComponent from "../components/CartComponent/CartComponent"

const Cart = () => {
  const { cart, addToCart } = useContext(CartContext)

  const [, updateState] = useState()

  console.log("Cart.render cart", cart)
  console.log("Cart.render addToCart", addToCart)

  return (
    <Layout>
      <SEO title="Cart" />
      <CartComponent />
    </Layout>
  )
}

export default Cart

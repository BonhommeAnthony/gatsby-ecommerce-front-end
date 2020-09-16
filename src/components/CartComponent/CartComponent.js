import React, { useContext, useState, useCallback } from "react"
import "./CartComponent.css"

import Img from "gatsby-image"
import Checkout from "../../components/Checkout"

import { CartContext } from "../../context/cartContext"

import {
  cartSubtotal,
  cartTaxTotal,
  cartTotal,
  shouldPayShipping,
  SHIPPING_RATE,
} from "../../utils/cart"
import { formatPrice } from "../../utils/format"
import { Link } from "gatsby"

const CartComponent = () => {
  const { cart, addToCart, clearCart } = useContext(CartContext)

  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <div className="cart-container cart-page">
      <h2 className="section-title">CART</h2>
      {cart && cart.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            {cart.map((product, id) => (
              <tbody key={id}>
                <tr>
                  <td>
                    <div className="cart-info">
                      <Img
                        className="cartImage"
                        fluid={product.thumbnail.childImageSharp.fluid}
                      />
                      <div>
                        <p>{product.name}</p>
                        <br />
                        <span onClick={() => clearCart()} className="btn">
                          Remove
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <input onChange={() => product.qty} value={product.qty} />
                    <span
                      className="toggleSpan"
                      onClick={() => {
                        addToCart(product, +1)
                        forceUpdate()
                      }}
                    >
                      +
                    </span>
                    <span
                      className="toggleSpan"
                      onClick={() => {
                        addToCart(product, -1)
                        forceUpdate()
                      }}
                    >
                      -
                    </span>
                  </td>
                  <td>{formatPrice(product.price_in_cent * product.qty)}</td>
                </tr>
              </tbody>
            ))}
          </table>

          <div className="total-price">
            <table>
              <tbody>
                <tr>
                  <td>Subtotal</td>
                  <td>{formatPrice(cartSubtotal(cart))}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>{formatPrice(cartTaxTotal(cart))}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>
                    {shouldPayShipping(cart)
                      ? formatPrice(SHIPPING_RATE)
                      : "FREE"}
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{formatPrice(cartTotal(cart))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            style={{ display: "block" }}
            onClick={() => setShowCheckout(!showCheckout)}
            className="btn"
          >
            Initiate Checkout
          </button>

          {showCheckout && <Checkout cart={cart} />}
        </>
      ) : (
        <div className="hero spacing">
          <h3>Empty cart, Please add some products</h3>
          <Link className="btn" to="/">
            SEE PRODUCT
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartComponent

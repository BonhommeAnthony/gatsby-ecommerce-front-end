import React, { useEffect, useState, useContext } from "react"
import "./CheckoutForm.css"

import { CartContext } from "../../context/cartContext"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { formatPrice } from "../../utils/format"

const Card_Styles = {
  style: {
    base: {
      padding: "24px 12px",
      fontSize: "16px",
    },
  },
}

const generateInput = (label, value, setOnChange) => {
  return (
    <div>
      <div>
        <label htmlFor={label}>{label}</label>
      </div>

      <input
        id={label}
        value={value}
        onChange={e => setOnChange(e.target.value)}
      />
    </div>
  )
}

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const { cart, clearCart } = useContext(CartContext)

  const [shipping_name, setShipping_name] = useState("")
  const [shipping_adress, setShipping_adress] = useState("")
  const [shipping_state, setShipping_state] = useState("")
  const [shipping_country, setShipping_country] = useState("")
  const [shipping_zip, setShipping_zip] = useState("")

  const [token, setToken] = useState(null)
  const [total, setTotal] = useState("loading")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const valid = () => {
    if (
      !shipping_name ||
      !shipping_adress ||
      !shipping_state ||
      !shipping_country ||
      !shipping_zip
    ) {
      return false
    }
    return true
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    console.log("handleSubmit", e)
    const result = await stripe.confirmCardPayment(token, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })

    const data = {
      paymentIntent: result.paymentIntent,
      shipping_name,
      shipping_adress,
      shipping_state,
      shipping_country,
      shipping_zip,
      cart,
    }

    const response = await fetch("http://localhost:1337/orders", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const order = await response.json()

    if (order.id) console.log("payment intent", result.paymentIntent)
    console.log("handleSubmit", result)

    setSuccess(true)

    setLoading(false)

    clearCart()
  }

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:1337/orders/payment", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cart.map(product => ({
            ...product,
            ...{ id: product.strapiId },
          })),
        }),
      })
      const data = await response.json()

      console.log("loadToken data", data)
      setToken(data.client_secret)
      setTotal(data.amount)
      setLoading(false)
    }
    loadToken()
  }, [cart])

  return (
    <div style={{ margin: "24px auto", width: "50%" }}>
      {!loading ? <h3>Total: {formatPrice(total)}</h3> : <h3>Loading</h3>}

      {success ? (
        <h3>Your order was successfully processed</h3>
      ) : (
        <form
          style={{
            padding: "24px 50px",
            border: "1px solid #eee",
            margin: "20px 0",
          }}
          onSubmit={handleSubmit}
        >
          {generateInput("Shipping Recipient", shipping_name, setShipping_name)}
          {generateInput(
            "Shipping Adress",
            shipping_adress,
            setShipping_adress
          )}
          {generateInput("State", shipping_state, setShipping_state)}
          {generateInput("Country", shipping_country, setShipping_country)}
          {generateInput("Zip", shipping_zip, setShipping_zip)}

          <CardElement options={Card_Styles} />
          <button disabled={!stripe || !valid()} style={{ marginTop: "12px" }}>
            Buy it
          </button>
        </form>
      )}
    </div>
  )
}

export default CheckoutForm

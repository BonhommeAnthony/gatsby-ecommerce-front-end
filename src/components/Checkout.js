import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "./CheckoutForm/CheckoutForm"

const stripe = loadStripe(
  "pk_test_51HNx2oGG8EHPvm9SGsQt03lpD3GvTSrchAMLznwdF7DXU51fIcopVYwKkrhNh4tH6BztEsLItOWYuDGeOu3Wq50800NLkxWI2b"
)

const Checkout = () => {
  return (
    <div>
      <Elements stripe={stripe}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default Checkout

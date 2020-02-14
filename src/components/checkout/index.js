import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../cart-provider'
import CartSummary from './cart-summary'
import ShippingDetails from './shipping-details'

import './checkout.scss'

export default ({ onSessionUpdate }) => {
  const { cart } = useContext(CartContext)
  const [checkoutSession, setCheckoutSession] = useState(false)
  const [error, setError] = useState(null)
  let stripe = null

  useEffect(() => {
    stripe = window.Stripe("pk_test_okOJsiRTntebwPSXkuGe4XOJ")
  })  

  const createCheckoutSession = async (details) => {
    let items = cart.reduce((res, item) => {
      res[item[0].sku] = item[1]
      return res
    }, {})

    let path = window.location.href.split('?')[0]

    try {
      let result = await fetch('/.netlify/functions/checkout', {
        method: 'POST',
        body: JSON.stringify({ email: details.email, items, shipping: details.shipping, success_url: `${path}?success=true&session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${path}?cancel=true` }),
        headers: { 'Content-Type': 'application/json' }
      })

      let { id: session_id } = await result.json()
      setCheckoutSession(session_id)
    }
    catch (err) {
      setError(error.message)
    }
  }

  const checkout = async () => {
    const { error: err } = await stripe.redirectToCheckout({
      sessionId: checkoutSession
    })
    if (err)
      setError(err)
  }

  let checkoutButton = null
  if (checkoutSession)
    checkoutButton = <button className="button is-primary" onClick={() => {checkout()}}>Proceed to Payment</button>

  if (error)
    console.error(error)

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <h1 className="checkout-subtitle">Shipment Details</h1>
            <ShippingDetails cart={cart} onVerifiedShippingInfo={(details) => createCheckoutSession(details)} onInvalidateShippingInfo={() => setCheckoutSession(null)} />
          </div>
          <div className="column is-offset-1">
            <CartSummary />
            <div className="has-text-centered">
              {checkoutButton}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
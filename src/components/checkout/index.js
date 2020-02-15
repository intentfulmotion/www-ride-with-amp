import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from '../cart-provider'
import CartSummary from './cart-summary'
import ShippingDetails from './shipping-details'
import AmpLogo from '../../images/amp-icon.svg'

import './checkout.scss'

export default ({ onSessionUpdate }) => {
  const { cart } = useContext(CartContext)
  const [checkoutSession, setCheckoutSession] = useState(null)
  const [error, setError] = useState(null)
  let stripe = null

  useEffect(() => {
    stripe = window.Stripe("pk_test_okOJsiRTntebwPSXkuGe4XOJ")
  })

  if (cart.length > 0) {
    const createCheckoutSession = async (details) => {
      console.log('create checkout session')
      document.getElementById('checkout-button').classList.add('is-loading')
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
        console.log('checkout session created', session_id)
        document.getElementById('checkout-button').classList.remove('is-loading')
        setCheckoutSession(session_id)
      }
      catch (err) {
        console.error(err)
        setError('there was an error creating the checkout session')
      }
    }

    const checkout = async () => {
      const { error: err } = await stripe.redirectToCheckout({
        sessionId: checkoutSession
      })
      if (err)
        setError(err)
    }

    
    let checkoutButton = <button id="checkout-button" className="button is-primary is-outlined" onClick={() => {checkout()}} disabled={checkoutSession === null}>Proceed to Payment</button>

    if (error)
      console.error(error)

    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <CartSummary />
            </div>
            <div className="column is-offset-1">
              <h1 className="checkout-subtitle">Shipment Details</h1>
              <ShippingDetails cart={cart} onVerifiedShippingInfo={(details) => createCheckoutSession(details)} onInvalidateShippingInfo={() => setCheckoutSession(null)} />
              <div className="has-text-centered">
                {checkoutButton}
                {error}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  else {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered invalid-content">
            <div className="column has-text-centered">
              <img className="invalid-content-logo" src={AmpLogo} alt="Empty Cart" />
              <h3 className="subtitle">Hmmm....your cart is empty. Check out the store to fix that!</h3>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
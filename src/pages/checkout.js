import React from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CheckoutForm from '../components/checkout.form'
import { StripeProvider, Elements } from 'react-stripe-elements'

export const StripeAPIKey = "pk_live_DjVeCbarLJtrnDP5ntOs5Hua"

const CheckoutPage = () => {
  let stripe = null

  if (window.Stripe)
    stripe = window.Stripe(StripeAPIKey)
  else
    document.querySelector('$stripe-js').addEventListener('load', () => {
      stripe = window.Stripe(StripeAPIKey)
    })
  
  return (
    <Layout>
      <Navbar alt={true} />
      <div className="section">
        <div className="container">
          <StripeProvider stripe={stripe}>
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    </Layout>
  )
}

export default CheckoutPage
import React from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CheckoutForm from '../components/checkout.form'
import { CartContext } from '../components/cart.provider'

import { Elements, StripeProvider } from 'react-stripe-elements'
export const StripeAPIKey = "pk_live_DjVeCbarLJtrnDP5ntOs5Hua"

const CheckoutPage = () => {
  return (
    <Layout>
      <Navbar alt={true} />
      <CartContext.Consumer>
        { cart => (
            <div className="section">
              <div className="container">
                <StripeProvider apiKey={StripeAPIKey}>
                  <Elements>
                    <CheckoutForm cart={cart} />
                  </Elements>
                </StripeProvider>
              </div>
            </div>
          )
        }
      </CartContext.Consumer>
    </Layout>
  )
}

export default CheckoutPage
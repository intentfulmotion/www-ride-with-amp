import React from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CheckoutForm from '../components/checkout.form'
import CheckoutCart from '../components/checkout.cart'
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
                <h1 className="title">Checkout</h1>
                <div className="columns">
                  <div className="column">
                    <CheckoutCart />
                  </div>
                  <div className="column checkout-divider">
                    <StripeProvider apiKey={StripeAPIKey}>
                      <Elements>
                        <CheckoutForm cart={cart} />
                      </Elements>
                    </StripeProvider>
                  </div>
                </div>
                </div>
            </div>
          )
        }
      </CartContext.Consumer>
    </Layout>
  )
}

export default CheckoutPage
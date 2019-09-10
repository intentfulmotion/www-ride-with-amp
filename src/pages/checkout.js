import React from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CheckoutForm from '../components/checkout.form'
import { StripeProvider, Elements } from 'react-stripe-elements'

export const StripeAPIKey = "pk_live_DjVeCbarLJtrnDP5ntOs5Hua"

class CheckoutPage extends React.Component {
  state = { stripe: null }

  componentDidMount() {
    if (window.Stripe)
      this.setState({ ...state, stripe: window.Stripe(StripeAPIKey) })
  else
    document.querySelector('$stripe-js').addEventListener('load', () => {
      this.setState({ ...state, stripe: window.Stripe(StripeAPIKey) })
    })
  }

  render() {
    return (
      <Layout>
        <Navbar alt={true} />
        <div className="section">
          <div className="container">
            <StripeProvider stripe={this.state.stripe}>
              <Elements>
                <CheckoutForm />
              </Elements>
            </StripeProvider>
          </div>
        </div>
      </Layout>
    )
  }
}

export default CheckoutPage
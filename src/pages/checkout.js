import React from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'

export const StripeAPIKey = "pk_live_DjVeCbarLJtrnDP5ntOs5Hua"

class CheckoutPage extends React.Component {
  state = { stripe: null }

  componentDidMount() {
    if (window.Stripe)
      this.setState({ ...this.state, stripe: window.Stripe(StripeAPIKey) })
  else
    document.querySelector('$stripe-js').addEventListener('load', () => {
      this.setState({ ...this.state, stripe: window.Stripe(StripeAPIKey) })
    })
  }

  render() {
    return (
      <Layout>
        <Navbar alt={true} />
        <div className="section">
          <div className="container">
          </div>
        </div>
      </Layout>
    )
  }
}

export default CheckoutPage
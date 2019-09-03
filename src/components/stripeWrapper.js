import React from 'react'
import { StripeProvider, injectStripe, Elements } from 'react-stripe-elements'

export const StripeAPIKey = "pk_live_DjVeCbarLJtrnDP5ntOs5Hua"

class StripeWrapper extends React.Component {
  constructor() {
    super()
    this.state = { stripe: null }
  }

  componentDidMount() {
    if (window.Stripe)
      this.setState({ stripe: window.Stripe(StripeAPIKey)})
    else {
      document.querySelector('$stripe-js').addEventListener('load', () => {
        this.setState({ stripe: window.Stripe(StripeAPIKey)})
      })
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          
        </Elements>
      </StripeProvider>
    )
  }
}

export default StripeWrapper
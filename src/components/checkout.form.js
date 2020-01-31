import React, { Component } from 'react'
import {injectStripe, CardElement, PaymentRequestButtonElement} from 'react-stripe-elements'
import listOfCountries from 'iso3166-2-db/i18n/dispute/UN/en';
import AddressSection from './checkout/address'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canMakePayment: false,
      paymentRequest: null,
    }
  }

  componentDidMount() {
    const paymentRequest = this.props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Amp Checkout',
        amount: Math.round(this.props.cart.total * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: true,
      shippingOptions: [{
        id: 'free-shipping',
        label: 'Free shipping',
        detail: 'Arrives in 5 to 7 days',
        amount: 0,
      }]
    })

    paymentRequest.on('token', ({ complete, token, ...data}) => {
      console.log('received stripe token: ', token)
      console.log('received customer information: ', data)
    })

    this.updateCanMakePayment(paymentRequest)
  }

  async updateCanMakePayment(paymentRequest) {
    let result = await paymentRequest.canMakePayment()
    this.setState({ canMakePayment: result, paymentRequest: paymentRequest })
  }

  checkout(event) {
    event.preventDefault()
  }

  render() {
    let paymentRequestButton = this.state.canMakePayment ? (
      <div className="payment-request-container">
        <PaymentRequestButtonElement
          paymentRequest={this.state.paymentRequest}
          className="PaymentRequestButton"
          style={{
            paymentRequestButton: {
              theme: 'light',
              height: '64px',
              marginBottom: '1rem'
            }
          }}
        />

        <h6 className="has-text-centered checkout-option-text">Or enter your shipment and payment details below</h6>
      </div>
    ) : null

    return (
      <div className="checkout-root">
        <div className="box">
          {paymentRequestButton}
          <h3>Shipping Address</h3>
          <AddressSection />
        </div>
        <div className="has-text-centered">
          <button className="button is-primary" onClick={() => {}}>Get Shipping Options</button>
        </div>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
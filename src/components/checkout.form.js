import React, { Component } from 'react'
import {injectStripe, PaymentRequestButtonElement} from 'react-stripe-elements'
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
    // const paymentRequest = this.props.stripe.paymentRequest({
    //   country: 'US',
    //   currency: 'usd',
    //   total: {
    //     label: 'Amp Checkout',
    //     amount: Math.round(this.props.cart.total * 100),
    //   },
    //   requestPayerName: true,
    //   requestPayerEmail: true,
    //   requestShipping: true,
    //   shippingOptions: [{
    //     id: 'free-shipping',
    //     label: 'Free shipping',
    //     detail: 'Arrives in 5 to 7 days',
    //     amount: 0,
    //   }]
    // })

    // paymentRequest.on('token', ({ complete, token, ...data}) => {
    //   console.log('received stripe token: ', token)
    //   console.log('received customer information: ', data)
    // })

    // this.updateCanMakePayment(paymentRequest)
  }

  async updateCanMakePayment(paymentRequest) {
    let result = await paymentRequest.canMakePayment()
    this.setState({ canMakePayment: result, paymentRequest: paymentRequest })
  }

  checkout(event) {
    event.preventDefault()
  }

  async getShippingOptions(to, parcels) {
    var response = await fetch(`https://amp.intentfulmotion.com/.netlify/functions/rates`, {
      method: 'POST',
      body: JSON.stringify({ toAddress: to, parcels: parcels }),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(await response.text())
  }

  render() {
    let parcels = this.props.cart.cart.map(p => {
      return { length: p.length, width: p.width, height: p.depth, distance_unit: 'cm', mass_unit: 'g' }
    })

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
          <AddressSection onSubmit={(address) => { this.getShippingOptions(address, parcels) }} submitText="Get Shipping Options" />
        </div>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
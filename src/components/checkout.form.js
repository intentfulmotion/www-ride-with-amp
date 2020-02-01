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

    // paymentRequest.on('shippingaddresschange', (ev) => {
    //   console.log(ev.shippingAddress)
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

  calculateParcelsRequired() {
    let { cart } = this.props.cart
    let boxes = []

    cart.map(p => {
      let product = p[0]
      let parcel = product.parcel
      let quantity = p[1]
      for (let left = quantity; left > 0;) {
        boxes.push({ ...parcel, distance_unit: 'cm', mass_unit: 'kg', weight: parcel.weight + (left * product.weight )})
        left -= product.unitsPerParcel
      }
    })

    return boxes
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
          <AddressSection onSubmit={(address) => { this.getShippingOptions(address, this.calculateParcelsRequired()) }} submitText="Get Shipping Options" />
        </div>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
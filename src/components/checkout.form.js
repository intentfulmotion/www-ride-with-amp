import React, { Component } from 'react'
import { CartContext } from '../components/cart.provider'
import {injectStripe, CardElement, PaymentRequestButtonElement} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canMakePayment: false,
      paymentRequest: null
    }
  }

  componentDidMount() {
    const paymentRequest = this.props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: this.props.cart.total * 100,
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
    console.log('can make payment: ', result)
    this.setState({ canMakePayment: result, paymentRequest: paymentRequest })
  }

  checkout(event) {
    event.preventDefault()
  }

  render() {
    console.log(this.state)
    let paymentRequestButton = this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          paymentRequestButton: {
            theme: 'light',
            height: '64px'
          }
        }}
      />
    ) : null

    console.log(paymentRequestButton)

    return (
      <form onSubmit={(ev) => { this.checkout(ev) }}>
        {paymentRequestButton}
        <CardElement />
        <button>Confirm Order</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
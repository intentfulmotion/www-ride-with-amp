import React, { Component, useContext } from 'react'
import { CartContext } from './cart.provider'
import {injectStripe, CardElement, PaymentRequestButtonElement} from 'react-stripe-elements'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    let { total } = useContext(CartContext)
  
    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: total * 100,
      },
      requestShipping: true
    })

    paymentRequest.on('token', ({ complete, token, ...data}) => {
      console.log('received stripe token: ', token)
      console.log('received customer information: ', data)
    })

    this.updateCanMakePayment(paymentRequest)

    this.state = {
      canMakePayment: false,
      paymentRequest
    }
  }

  async updateCanMakePayment(paymentRequest) {
    let result = await paymentRequest.canMakePayment()
    console.log(result)
    this.setState({ canMakePayment: !!result })
  }

  checkout(event) {
    event.preventDefault()
  }

  render() {
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

    return (
      <form onSubmit={(ev) => { this.checkout(ev) }}>
        <CardElement />
        {paymentRequestButton}
        <button>Confirm Order</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
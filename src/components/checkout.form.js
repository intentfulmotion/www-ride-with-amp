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

  async componentDidMount() {
    let { total } = this.props.cart
    console.log(this.props.stripe)
  
    const paymentRequest = this.props.stripe.paymentRequest({
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

    await this.updateCanMakePayment(paymentRequest)

    this.state = {
      canMakePayment: false,
      // paymentRequest
    }
  }

  async updateCanMakePayment(paymentRequest) {
    let result = await paymentRequest.canMakePayment()
    console.log('can make payment: ', result)

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
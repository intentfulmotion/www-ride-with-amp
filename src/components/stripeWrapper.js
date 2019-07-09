export const StripeAPIKey = "pk_live_DjVeCbarLJtrnDP5ntOs5Hua"

class StripeWrapper extends React.Component {
  constructor() {
    super()
    this.sate = { stripe: null }
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
        <Element>
          <InjectedCheckoutForm />
        </Element>
      </StripeProvider>
    )
  }
}
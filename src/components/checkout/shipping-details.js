import React, { Component } from 'react'

import ContactSection, { ContactSummary } from './contact'
import AddressSection, { AddressSummary } from './address'
// import ShippingOptions, { ShippingSummary } from './shipping-options'
import './checkout.scss'

class ShippingDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 0,
      customer: null,
      previousCustomer: false,
      customer_email: "",
      shipping: {
        name: '',
        phone: '',
        address: null
      },
      loadingShippingOptions: false,
      shippingOptions: [],
      oldCart: this.props.cart
    }
  }

  async updateShippingAddress(address) {
    this.setState({ ...this.state, shippingAddressErrors: [] })
    let addressNoContact = {
      line1: address.line1,
      line2: address.linee2,
      city: address.city,
      state: address.state,
      country: address.country,
      postal_code: address.postal_code
    }

    let toVerify = {
      name: address.name,
      phone: address.phone,
      street1: address.line1,
      street2: address.line2,
      city: address.city,
      state: address.state,
      country: address.country,
      zipcode: address.postal_code
    }

    try {
      let result = await fetch('/.netlify/functions/validate-address', {
        method: 'POST',
        body: JSON.stringify({ address: toVerify }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (result.status === 200) {
        const validationResult = await result.json()
        if (validationResult.is_valid) {
          this.setState({ ...this.state, shipping: { ...this.state.shipping, address: addressNoContact, name: address.name, phone: address.phone }, step: 3, shippingAddressValid: true, shippingAddressErrors: [] })

          if (this.props.onVerifiedShippingInfo)
            this.props.onVerifiedShippingInfo({ email: this.state.customer_email, previousCustomer: this.state.previousCustomer, customer: this.state.customer, shipping: this.state.shipping })
        }
        else
          this.setState({ ...this.state, shippingAddressValid: false, shippingAddressErrors: validationResult.messages.filter(m => m.type.indexOf('error') > 0 || m.type.indexOf('warning') > 0).map(m => m.text) })
      }
      else {
        let reason = await result.text()
        console.log('error result from server', reason)
        this.setState({ ...this.state, shippingAddressValid: false, shippingAddressErrors: [reason] })
      }
    }
    catch (err) {
      console.log('shipping validation error', err)
      this.setState({ ...this.state, shippingAddressValid: false, shippingAddressErrors: [err.message] })
    }
  }

  async updateContactInfo(email) {
    let result = await fetch(`/.netlify/functions/existing-customer`, {
      method: 'POST',
      body: JSON.stringify({ email: email }),
      headers: { 'Content-Type': 'application/json' }
    })

    let customer = await result.json()
    if (customer.id)
      this.setState({ ...this.state, previousCustomer: true, customer_email: email, customer: customer, step: 1 })
    else
      this.setState({ ...this.state, previousCustomer: false, customer_email: email, step: 1 })
  }

  renderSummarySteps() {
    let parts = []
    let { step } = this.state
    if (step > 0)
      parts.push(<ContactSummary key="contact-summary" email={this.state.customer_email} name={this.state.shipping.name} phone={this.state.shipping.phone} onEdit={() => { this.setState({ ...this.state, step: 0 }); this.props.onInvalidateShippingInfo() }} />)
    if (step > 1)
      parts.push(<AddressSummary key="shipping-address-summary" title="Shipping Address" address={this.state.shipping.address} onEdit={() => { this.setState({ ...this.state, step: 1 }); this.props.onInvalidateShippingInfo() }} />)
    // if (step > 2)
      // parts.push(<ShippingSummary key="shipping-rate-summary" rate={this.state.rate} onEdit={() => { this.setState({ ...this.state, step: 2 }) }} />)

    return parts
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props
    if (oldProps.cart !== newProps.cart && this.state.step === 3)
      this.setState({ ...this.state, step: 2 })
  }

  render() {
    let summarySteps = this.renderSummarySteps()
    console.log('step', this.state.step)
    switch (this.state.step) {
      case 0:
        return (
          <ContactSection email={this.state.customer_email} onStart={(email) => this.updateContactInfo(email)} />
        )
      case 1:
        return (
          <div>
            { summarySteps }
            <AddressSection name={this.state.shipping.name} phone={this.state.shipping.phone} address={this.state.shipping.address} errors={this.state.shippingAddressErrors} title="Shipping Address" onSubmit={(address) => { this.updateShippingAddress(address) }} submitText="Verify Address" />
          </div>
        )
      case 2:
        return (
          <div>
            { summarySteps }
            {/* <ShippingOptions address={this.state.shipping.address} onSelected={(rate) => { this.setState({ ...this.state, rate: rate, shipping: { ...this.state.shipping, carrier: rate.provider }, step: 3 })}} /> */}
          </div>
        )
      case 3:
        return (
          <div>
            {summarySteps}
          </div>
        )
      default:
        return (<div></div>)
    }
  }
}

export default ShippingDetails
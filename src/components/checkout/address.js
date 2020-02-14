import React, { Component } from 'react'
import listOfCountries from 'iso3166-2-db/i18n/dispute/UN/en';
import { MdEdit, MdLocalShipping } from 'react-icons/md'

class AddressSection extends Component {
  constructor(props) {
    super(props)
    let initState = {
      name: "",
      phone: "",
      address: {          
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        postal_code: ""
      },
      saveAddress: false
    }

    // probably should just use Object.assign but how do you null check?
    if (this.props.address)
      initState.address = this.props.address
    if (this.props.name)
      initState.name = this.props.name
    if (this.props.phone)
      initState.phone = this.props.phone
    if (this.props.saveAddress)
      initState.saveAddress = this.props.saveAddress

    this.state = initState
  }

  onCountryChange = (country) => {
    this.setState({
      address: { ...this.state.address, country: country, state: null }
    })

    if (this.props.onChange)
      this.props.onChange()
  }

  onRegionChange = (state) => {
    this.setState({
      address: { ...this.state.address, state: state }
    })

    if (this.props.onChange)
      this.props.onChange()
  }

  handleAddressChange = (event) => {
    this.setState({ address: { ...this.state.address, [event.target.name]: event.target.value }})

    if (this.props.onChange)
      this.props.onChange()
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value })
  }

  renderStateSelector() {
    const { country } = this.state.address
    if (!country)
      return (<div></div>)

    const regions = listOfCountries[country].regions
    if (regions.length == 0)
      return (<div></div>)
    else
      return (
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">State / Province*</label>
          </div>
          <div className="field-body">
            <div className="field is-narrow">
              <div className="control">
                <div className="select is-fullwidth">
                  <select onChange={(event) => { this.onRegionChange(event.target.value) }} value={this.state.address.state}>
                    {
                      regions.map(region => <option key={region.iso} value={region.iso}>{region.name}</option>)
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
        </div>
      </div>
      )
  }

  render() {
    const stateSelect = this.renderStateSelector()

    return (
      <div className="card checkout-card">
        <div className="card-content">
          <form id="payment-form">
            <h2 className="subtitle">{this.props.title}</h2>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name*</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input name="name" className="input" type="text" onChange={this.handleChange} value={this.state.name} />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Phone Number*</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input name="phone" className="input" type="tel" placeholder="+11234567890" onChange={this.handleChange} value={this.state.phone} />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Street Address*</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <input name="line1" className="input" type="text" placeholder="Street Address" onChange={this.handleAddressChange} value={this.state.address.line1} />
                </div>
                <div className="field is-narrow">
                  <input name="line2" className="input is-success" type="text" placeholder="Unit / Apt #" onChange={this.handleAddressChange} value={this.state.address.line2} />
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Country*</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select onChange={(event) => { this.onCountryChange(event.target.value) }} value={this.state.address.country}>
                        {
                          Object.keys(listOfCountries).map(isoCode => <option key={isoCode} value={isoCode}>{listOfCountries[isoCode].name}</option>)
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            { stateSelect }
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">City*</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input name="city" className="input" type="text" onChange={this.handleAddressChange} value={this.state.address.city} />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Postcode*</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input name="postal_code" className="input" type="text" onChange={this.handleAddressChange} value={this.state.address.postal_code}  />
                  </div>
                </div>
              </div>
            </div>
            <div className="has-text-centered">
              <button className="button is-primary is-outlined" onClick={(evt) => { evt.preventDefault(); this.props.onSubmit(this.state.address) }}>{this.props.submitText}</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export const AddressSummary = ({ title, address, onEdit, onChange }) => {
  if (!onEdit)
    onEdit = () => {}

  return (
    <div className="card checkout-card">
      <header className="card-header">
        <p className="card-header-title">
          {title}
        </p>
        <button href="" className="card-header-icon button has-text-info is-text" aria-label="more options" onClick={() => onEdit()}>
          <span className="icon">
            <MdEdit />
          </span>
        </button>
      </header>
      <div className="card-content">
        <span><MdLocalShipping className="checkout-summary-icon" /> {address.line1}{ address.line2.length > 0 ? `, ${address.line2}` : '' }, { address.city }, { address.state }, { address.country } { address.postal_code }</span><br/>
      </div>
    </div>
  )
}

export default AddressSection
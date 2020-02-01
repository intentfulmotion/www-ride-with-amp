import React, { Component } from 'react'
import listOfCountries from 'iso3166-2-db/i18n/dispute/UN/en';

class AddressSection extends Component {
  state = {
    address: {
      name: "",
      phone: "",
      email: "",
      street1: "",
      street_no: "",
      city: "",
      state: "",
      country: "",
      zipcode: ""
    }
  }
  constructor(props) {
    super()
  }

  onCountryChange = (event) => this.setState({
    address: { ...this.state.address, country: event.target.value, state: null }
  })

  onRegionChange = (event) => this.setState({
    address: { ...this.state.address, state: event.target.value }
  })

  handleChange = (event) => {
    this.setState({ address: { ...this.state.address, [event.target.name]: event.target.value }})
  }

  renderStateSelector() {
    const {country} = this.state.address
    if (!country)
      return (<div></div>)

    const regions = listOfCountries[country].regions
    if (regions.length == 0)
      return (<div></div>)
    else
      return (
        <select onChange={this.onRegionChange} selected={this.state.address.selectedRegion}>
          {
            regions.map(region =>
              <option key={region.iso} value={region.iso}>{region.name}</option>
            )
          }
        </select>
      )
  }

  

  render() {
    const stateSelect = this.renderStateSelector()

    return (
      <form id="payment-form">
        <div className="field columns">
          <div className="column">
            <label className="label">Name*</label>
            <div className="control">
              <input name="name" className="input" type="text" onChange={this.handleChange} value={this.state.address.name} />
            </div>
          </div>
          <div className="column">
            <label className="label">Email*</label>
            <div className="control">
              <input name="email" className="input" type="email" onChange={this.handleChange} value={this.state.address.email} />
            </div>
          </div>
          <div className="column">
            <label className="label">Phone Number*</label>
            <div className="control">
              <input name="phone" className="input" type="tel" onChange={this.handleChange} value={this.state.address.phone} />              
            </div>
          </div>
        </div>
        <div className="field columns">
          <div className="column is-8">
            <label className="label">Street Address*</label>
            <div className="control">
              <input name="street1" className="input" type="text" onChange={this.handleChange} value={this.state.address.street1} />
            </div>
          </div>
          <div className="column">
            <label className="label">Apt / Unit</label>
            <div className="control">
            <input name="street_no" className="input" type="text" onChange={this.handleChange} value={this.state.address.street_no} />
            </div>
          </div>
        </div>
        <div className="field columns">
          <div className="column is-6">
            <label className="label">City*</label>
            <div className="control">
              <input name="city" className="input" type="text" onChange={this.handleChange} value={this.state.address.city} />
            </div>            
          </div>
          <div className="column is-6">
            <label className="label">State / Province / Region</label>
            <div className="control">
              <div className="select">
                { stateSelect }
              </div>
            </div>
          </div>    
        </div>
        <div className="field columns">
          <div className="column">
            <label className="label">Country*</label>
            <div className="control">
              <div className="select">
                <select onChange={this.onCountryChange}>
                  {
                    Object.keys(listOfCountries).map(isoCode =>
                      <option key={isoCode} value={isoCode}>{listOfCountries[isoCode].name}</option>
                    )
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="column">
            <label className="label">Zip Code*</label>
            <div className="control">
              <input name="zipcode" className="input" type="text" onChange={this.handleChange} value={this.state.address.zipcode}  />
            </div>
          </div> 
        </div>
        <div className="has-text-centered">
          <button className="button is-primary" onClick={(evt) => { evt.preventDefault(); this.props.onSubmit(this.state.address) }}>{this.props.submitText}</button>
        </div>
      </form>
    )
  }
}

export default AddressSection
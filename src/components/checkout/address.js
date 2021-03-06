import React, { useState } from 'react'
import listOfCountries from 'iso3166-2-db/i18n/dispute/UN/en'
import { MdEdit, MdLocalShipping } from 'react-icons/md'
import { useForm } from "react-hook-form"

const AddressSection = ({ submitText, title, name, phone, address, onSubmit, errors: addressErrors }) => {
  const { register, handleSubmit, setValue, errors } = useForm()
  const [country, setCountry] = useState(address ? address.country : null)
  const [state, setState] = useState(address ? address.state : null)

  const onCountryChange = (e) => {
    setValue('country', e.target.value)
    setCountry(e.target.value)
  }

  const onRegionChange = (e) => {
    setValue('state', e.target.value)
    setState(e.target.value)
  }

  const beforeSubmit = (data) => {
    document.getElementById('address-submit').classList.add('is-loading')
    onSubmit(data)
  }

  const removeNotification = () => {
    let el = document.getElementById('error-notification')
    el.classList.add('is-hidden')
  }

  let addressErrorContent = null
  if (addressErrors && addressErrors.length > 0) {
    addressErrorContent = (
      <div id="error-notification" className="notification is-danger">
        <button className="delete" onClick={() => removeNotification()}></button>
        { addressErrors.map((e, i) => (<p key={`error-${i}`}>{e}</p>)) }
      </div>
    )
    document.getElementById('address-submit').classList.remove('is-loading')
  }

  let regions = []
  if (country)
    regions = listOfCountries[country].regions

  return (
    <div className="card checkout-card">
      <div className="card-content">
        <form onSubmit={handleSubmit(beforeSubmit)}>
          <h2 className="subtitle">{title}</h2>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="name-field" className="label">Name*</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input id="name-field" name="name" className="input" type="text" defaultValue={name} ref={register({ required: true })} />
                  <span className="validation has-text-danger">{ errors.name && 'Name is required' }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="phone-field" className="label">Phone Number*</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input id="phone-field" name="phone" className="input" type="tel" placeholder="+11234567890" defaultValue={phone} ref={register({required: true, minLength: 6, maxLength: 12})} />
                  <span className="validation has-text-danger">{ errors.phone && 'Phone number is required' }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="line1-field" className="label">Street Address*</label>
            </div>
            <div className="field-body">
              <div className="field">
                <input id="line1-field" name="line1" className="input" type="text" placeholder="Street Address" defaultValue={address ? address.line1 : ''} ref={register({ required: true })} />
                <span className="validation has-text-danger">{ errors.line1 && 'Street address is required' }</span>
              </div>
              <div className="field is-narrow">
                <input name="line2" className="input" type="text" placeholder="Unit / Apt #" defaultValue={address ? address.line2 : ''} ref={register} />
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="city-field" className="label">City*</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input htmlFor="city-field" name="city" className="input" type="text" defaultValue={address ? address.city : ''} ref={register({ required: true })} />
                  <span className="validation has-text-danger">{ errors.city && "City is required" }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="country-field" className="label">Country*</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select id="country-field" name="country" onBlur={onCountryChange} defaultValue={country} ref={register({ required: true })}>
                      {
                        Object.keys(listOfCountries).map(isoCode => <option key={isoCode} value={isoCode}>{listOfCountries[isoCode].name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="region-field" className="label">State / Province*</label>
            </div>
            <div className="field-body">
              <div className="field is-narrow">
                <div className="control">
                  <div className="select is-fullwidth">
                    <select id="region-field" name="state" onBlur={onRegionChange} defaultValue={state} ref={register}>
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
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label htmlFor="postcode-field" className="label">Postcode*</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input id="postcode-field" name="postal_code" className="input" type="text" defaultValue={address ? address.postal_code : ''} ref={register({ required: true })} />
                  <span className="validation has-text-danger">{ errors.postal_code && 'Postcode is required' }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <button id="address-submit" className="button is-primary is-outlined">{submitText}</button>
          </div>
          {addressErrorContent}
        </form>
      </div>
    </div>
  )
}

// class AddressSection extends Component {
//   constructor(props) {
//     super(props)
//     let initState = {
//       name: "",
//       phone: "",
//       address: {          
//         line1: "",
//         line2: "",
//         city: "",
//         state: "",
//         country: "",
//         postal_code: ""
//       },
//       saveAddress: false
//     }

//     // probably should just use Object.assign but how do you null check?
//     if (this.props.address)
//       initState.address = this.props.address
//     if (this.props.name)
//       initState.name = this.props.name
//     if (this.props.phone)
//       initState.phone = this.props.phone
//     if (this.props.saveAddress)
//       initState.saveAddress = this.props.saveAddress

//     this.state = initState
//   }

//   onCountryChange = (country) => {
//     this.setState({
//       address: { ...this.state.address, country: country, state: null }
//     })

//     if (this.props.onChange)
//       this.props.onChange()
//   }

//   onRegionChange = (state) => {
//     this.setState({
//       address: { ...this.state.address, state: state }
//     })

//     if (this.props.onChange)
//       this.props.onChange()
//   }

//   handleAddressChange = (event) => {
//     this.setState({ address: { ...this.state.address, [event.target.name]: event.target.value }})

//     if (this.props.onChange)
//       this.props.onChange()
//   }

//   handleChange = (event) => {
//     this.setState({ ...this.state, [event.target.name]: event.target.value })
//   }

//   render() {
//     const stateSelect = this.renderStateSelector()

//     return (
//       <div className="card checkout-card">
//         <div className="card-content">
//           <form id="payment-form">
//             <h2 className="subtitle">{this.props.title}</h2>
            
//             { stateSelect }
            

//           </form>
//         </div>
//       </div>
//     )
//   }
// }

export const AddressSummary = ({ title, address, onEdit, onChange }) => {
  if (!onEdit)
    onEdit = () => {}

  let shippingNotification = null
  if (address.country != 'US')
    shippingNotification = (
    <div className="notification shipping-notification">
      Shipping outside of the U.S. will be charged a flat rate $20 USD
    </div>
  )

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
        { shippingNotification }
        <span><MdLocalShipping className="checkout-summary-icon" /> {address.line1}{ address.line2 ? `, ${address.line2}` : '' }, { address.city }, { address.state }, { address.country } { address.postal_code }</span><br/>
      </div>
    </div>
  )
}

export default AddressSection
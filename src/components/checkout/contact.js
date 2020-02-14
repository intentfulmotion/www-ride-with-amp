import React, { useState } from 'react'
import { MdMail, MdEdit } from 'react-icons/md'

export default ({ onStart, email }) => {
  const [_email, setEmail] = useState(email ? email : "")

  const startCheckout = (evt) => {
    evt.preventDefault()
    onStart(_email)
  }

  return (
    <div className="card">
      <div className="card-content">
        <form id="contact-form" onSubmit={startCheckout}>
          <h2 className="subtitle">Contact</h2>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Email*</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input name="phone" className="input" type="text" placeholder="example@email.com" onChange={(evt) => { setEmail(evt.target.value) }} value={_email} />
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <button type="submit" className="button is-primary is-outlined">Start Checkout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const ContactSummary = ({ email, onEdit }) => {
  if (!onEdit)
    onEdit = () => {}

  return (
    <div className="card checkout-card">
      <header className="card-header">
        <p className="card-header-title">
          Contact
        </p>
        <button href="" className="card-header-icon button has-text-info is-text" aria-label="more options" onClick={() => onEdit()}>
          <span className="icon">
            <MdEdit />
          </span>
        </button>
      </header>
      <div className="card-content">
        <span><MdMail className="checkout-summary-icon" /> {email}</span>
      </div>
    </div>
  )
}
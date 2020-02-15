import React from 'react'
import { MdMail, MdEdit } from 'react-icons/md'
import { useForm } from "react-hook-form"

export default ({ onStart, email }) => {
  const { handleSubmit, register, errors } = useForm()

  const startCheckout = values => {
    document.getElementById('contact-submit').classList.add('is-loading')
    onStart(values.email)
  }

  return (
    <div className="card checkout-card">
      <div className="card-content">
        <form id="contact-form" onSubmit={handleSubmit(startCheckout)}>
          <h2 className="subtitle">Contact</h2>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">Email</label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input name="email" className="input" type="text" placeholder="example@email.com"
                    ref={register({ 
                      required: 'required', 
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                      }
                    })} defaultValue={email} />
                    <span className="validation has-text-danger">{ errors.email && errors.email.message }</span>
                </div>
              </div>
            </div>
          </div>
          <div className="has-text-centered">
            <button id="contact-submit" type="submit" className="button is-primary is-outlined">Start Checkout</button>
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
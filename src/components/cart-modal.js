import React from 'react'
import CartSummary from './checkout/cart-summary'

export default () => {
  const hideModal = () => {
    document.getElementById('cart-modal').classList.remove('is-active')
  }
  return (
    <div id="cart-modal" className="modal">
      <div className="modal-background" onClick={() => hideModal()}></div>
      <div className="modal-content box">
        <CartSummary />
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => hideModal()}></button>
    </div>
  )
}

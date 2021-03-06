import React, { useContext } from 'react'
import { CartContext } from './cart-provider'
import { Link } from 'gatsby'
import CartSummary from './checkout/cart-summary'

export default () => {
  const { cart } = useContext(CartContext)
  const hideModal = () => {
    document.getElementById('cart-modal').classList.remove('is-active')
  }

  const keyPressHideModal = event => {
    let char = event.which || event.keyCode
    if (char === 27)
      hideModal()
  }

  let checkoutButton = cart.length > 0 ? 
    (<Link to="/checkout" className="button is-primary has-text-white checkout-card" title="Checkout">Checkout</Link>) :
    (<button className="button is-primary has-text-white checkout-card" disabled>Checkout</button>)

  return (
    <div id="cart-modal" className="modal" tabIndex="-1" onKeyPress={keyPressHideModal} role="dialog">
      <div className="modal-background" onClick={hideModal} onKeyPress={keyPressHideModal} role="dialog"></div>
      <div className="modal-content box">
        <CartSummary />
        <div className="has-text-centered">
          { checkoutButton }
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={() => hideModal()}></button>
    </div>
  )
}

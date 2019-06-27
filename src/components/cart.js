import React, { useContext } from 'react'
import { CartContext } from './cart.provider'
import { FaTimes } from 'react-icons/fa'

const stripe = window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY)

const Cart = () => {
  let { cart, contents, remove, total } = useContext(CartContext)
  console.log(contents)

  const redirectToCheckout = async (event) => {
    event.preventDefault()

    const { error } = await stripe.redirectToCheckout({
      items: contents.map((item ) => { return { sku: item[0], quantity: item[1] } }),
      successUrl: `${window.location.origin}/order-success`,
      cancelUrl: `${window.location.href}`,
    })

    if (error) {
      console.error('Error:', error)
    }
  }

  const toggleCart = () => {
    document.getElementById('shopping-cart').classList.toggle('is-active')
  }

  return (
    <div className="modal" id="shopping-cart">
      <div className="modal-background" onClick={() => {toggleCart()}}></div>
      <button className="modal-close is-large" aria-label="close" onClick={() => {toggleCart()}}></button>
      <div className="modal-content">
        <div className="box">
          <div className="content">
            <h3 className="title is-3">Cart</h3>
            <table>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub-Total</th>
                <th></th>
              </tr>

              {
                cart.map((item, i) => (
                  <tr key="cart-item-${i}">
                    <td>{item[0].attributes.name}</td>
                    <td>{`$${item[0].price / 100}`}</td>
                    <td>{item[1]}</td>
                    <td>{item[0].price / 100 * item[1]}</td>
                    <td><a className="is-rounded is-outlined" onClick={() => { remove(item[0].id) }}><span className="icon"><FaTimes /></span></a></td>
                  </tr>
                ))
              }
            </table>
            <div className="columns">
              <div className="column is-3 is-offset-6">
                <h5>Total: ${total/100}</h5>
              </div>
              <div className="column is-2">
                <button onClick={event => redirectToCheckout(event)} disabled={!cart.length} className="button is-primary">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
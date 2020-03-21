import React, { useContext } from 'react'
import { CartContext } from '../cart-provider'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { FormattedNumber } from 'react-intl'
import Img from 'gatsby-image'

export default ({ shipping, taxes }) => {
  const { cart, total, remove, set } = useContext(CartContext)
  let summaryTotal = parseFloat(total)
  summaryTotal += shipping ? shipping : 0.00
  summaryTotal += taxes ? taxes : 0.00

  return (
    <div>
      <div className="checkout-cart">
        <span className="checkout-subtitle">Bag Contents</span>
        <div className="cart-items">
          { 
            cart.map(item => {
              let product = item[0]
              let quantity = item[1]

              return (
                <div className="card" key={`cart-item-${product.sku}`}>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image cart-image">
                          <Img fluid={product.images[0].fluid} alt={product.name} />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="checkout-item-title is-hidden-mobile">{product.name}</p>
                        <p className="checkout-item-subtitle is-hidden-mobile">Quantity: {quantity}</p>
                      </div>
                      <div className="media-right">
                        <p className="checkout-item-title has-text-right"><FormattedNumber value={product.price * quantity} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} /></p>
                        <div className="buttons checkout-item-subtitle">
                          <button className="button is-white" onClick={() => { quantity === 1 ? remove(product.sku) : set(product.sku, quantity - 1) }}>
                            <span className="icon is-small">
                              <FaMinus />
                            </span>
                          </button>
                          <button className="button is-white" disabled>
                            { quantity }
                          </button>
                          <button className="button is-white" onClick={() => set(product.sku, quantity + 1)}>
                            <span className="icon is-small">
                              <FaPlus />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="is-hidden-desktop is-hidden-tablet">
                      <p className="checkout-item-title">{product.name}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="is-divider" data-content="SUMMARY"></div>
        <div className="columns is-mobile">
          <div className="column">
            <p className="checkout-line-item">Sub-Total</p>
            <p className="checkout-line-item">Shipping</p>
            <p className="checkout-line-item">Taxes</p>
            <p className="checkout-line-total">Total</p>
          </div>
          <div className="column has-text-right">
            <p className="checkout-line-item">{<FormattedNumber value={total} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} />}</p>
            <p className="checkout-line-item">{ shipping ? <FormattedNumber value={shipping} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} /> : ('Included') }</p>
            <p className="checkout-line-item">{ taxes ? <FormattedNumber value={taxes} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} /> : ('Included') }</p>
            <p className="checkout-line-total">{<FormattedNumber value={summaryTotal} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} />}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
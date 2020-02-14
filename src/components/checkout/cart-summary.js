import React, { useContext } from 'react'
import { CartContext } from '../cart-provider'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { FormattedNumber } from 'react-intl'

export default ({ shipping, taxes }) => {
  const { cart, total, remove, set } = useContext(CartContext)

  return (
    <div>
      <div className="checkout-cart">
        <h1 className="checkout-subtitle">Bag Contents</h1>
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
                        <figure className="image is-64x64">
                          <img src={product.images[0].file.url} alt={product.name} />
                        </figure>
                      </div>
                      <div className="media-content">
                        <h3 className="checkout-item-title">{product.name}</h3>
                        <h4 className="checkout-item-subtitle">Quantity: {quantity}</h4>
                      </div>
                      <div className="media-right">
                        <h3 className="checkout-item-title has-text-right"><FormattedNumber value={product.price * quantity} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} /></h3>
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
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="is-divider" data-content="SUMMARY"></div>
        <div className="columns">
          <div className="column">
            <h2 className="checkout-line-item">Sub-Total</h2>
            <h2 className="checkout-line-item">Shipping</h2>
            <h2 className="checkout-line-item">Taxes</h2>
            <h2 className="checkout-line-total">Total</h2>
          </div>
          <div className="column has-text-right">
            <h2 className="checkout-line-item">{<FormattedNumber value={total} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} />}</h2>
            <h2 className="checkout-line-item">{ shipping ? <FormattedNumber value={shipping} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} /> : ('Included') }</h2>
            <h2 className="checkout-line-item">{ taxes ? <FormattedNumber value={taxes} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} /> : ('Included') }</h2>
            <h2 className="checkout-line-total">{<FormattedNumber value={total} style="currency" currency="USD" minimumFractionDigits={2} maximumFractionDigits={2} />}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
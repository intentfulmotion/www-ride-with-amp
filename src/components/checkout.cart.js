import React, { useContext } from 'react'
import { CartContext } from './cart.provider'
import { FaPlus, FaMinus } from 'react-icons/fa'

const SingleProductCheckoutView = () => {
  const { cart, total, remove, set } = useContext(CartContext)
  const product = cart[0][0]
  const quantity = cart[0][1]
  console.log(quantity)

  return (
    <div className="checkout-cart">
      <div className="columns">
        <div className="column is-8">
          <h2 className="subtitle">{product.name}</h2>
          <h1 className="title">${ total } USD</h1>
          <figure className="image is-3by2">
            <img src={product.images[0].file.url} alt={product.name} />
          </figure>
        </div>
        <div className="column is-3">
          <button class="button is-white" onClick={() => { quantity === 1 ? remove(product.sku) : set(product.sku, quantity - 1) }}>
            <span class="icon is-small">
              <FaMinus />
            </span>
          </button>
          <button class="button is-white" disabled>
            { quantity }
          </button>
          <button class="button is-white" onClick={() => set(product.sku, quantity + 1)}>
            <span class="icon is-small">
              <FaPlus />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

const MultipleProductsCheckoutView = () => {
  const { cart, total, remove, set } = useContext(CartContext)
  console.log(cart)

  const totalItems = cart.reduce((items, product) => items + product[1], 0)


  return (
    <div>
      <div className="checkout-cart">
        <h2 className="checkout-subtitle">Sub-Total</h2>
        <h1 className="checkout-title">${ total } USD</h1>
        <h3 className="checkout-subtitle checkout-items-title">Bag Contents</h3>
        { 
          cart.map(item => {
            let product = item[0]
            let quantity = item[1]
            console.log('product', product)

            return (
              <div className="card">
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
                      <h3 className="checkout-item-title has-text-right">${(product.price * quantity).toFixed(2)} USD</h3>
                      <div className="buttons checkout-item-subtitle">
                        <button class="button is-white" onClick={() => { quantity === 1 ? remove(product.sku) : set(product.sku, quantity - 1) }}>
                          <span class="icon is-small">
                            <FaMinus />
                          </span>
                        </button>
                        <button class="button is-white" disabled>
                          { quantity }
                        </button>
                        <button class="button is-white" onClick={() => set(product.sku, quantity + 1)}>
                          <span class="icon is-small">
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
    </div>
  )
}

const CheckoutCart = () => {
  const { cart } = useContext(CartContext)

  let content = null

  if (cart.length == 1)
    content = SingleProductCheckoutView()
  else
    content = MultipleProductsCheckoutView()

  return (
    <div>
      {content}
    </div>
  )
}

export default CheckoutCart
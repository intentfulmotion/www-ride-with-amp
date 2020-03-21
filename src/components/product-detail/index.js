import React, { useContext } from 'react'
import { CartContext } from '../cart-provider'
import Carousel from '../carousel'

import './product-detail.scss'

export default ({ product }) => {
  const { add } = useContext(CartContext)

  const addToCart = (evt) => {
    evt.preventDefault()
    add(product.sku)
    document.getElementById('cart-modal').classList.add('is-active')
    document.getElementById('cart-modal').focus()
  }

  const addToCartButton = product.active ? (
    <div>
      <button className="button is-primary" onClick={(evt) => addToCart(evt)}>
        Add to Cart
      </button>
      <span className="subtitle is-4 product-price">${product.price}</span>
    </div>
  ) : (<div></div>)

  return (
    <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column is-two-thirds">
          <Carousel images={product.images} videos={product.videos} />
        </div>
        <div className="column">
          <h1 className='product-title has-text-black'>{product.name}</h1>
          <span className='tag is-info stock-tag'>{product.active ? product.madeToOrder ? "Made to Order" : "In Stock" : "Out of stock"}</span>
          {addToCartButton}
          <div className="content product-description"
            dangerouslySetInnerHTML={{
              __html: product.description.childMarkdownRemark.html,
            }}
          />
        </div>
      </div>
    </div>
  </section>
  )
}
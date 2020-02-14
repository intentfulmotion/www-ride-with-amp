import React, { useContext } from 'react'
import { CartContext } from '../cart-provider'
import Carousel from '../carousel'

export default ({ product }) => {
  const { add } = useContext(CartContext)

  const addToCart = product.active ? (
    <div>
      <button className="button is-primary" onClick={() => { add(product.sku) }}>
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
          <Carousel images={product.images} />
        </div>
        <div className="column">
          <h1 className='title has-text-black'>{product.name}</h1>
          <h2 className='subtitle'>{product.active ? "In stock" : "Out of stock"}</h2>
          {addToCart}
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
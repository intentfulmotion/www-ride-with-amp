import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { FaCartPlus } from 'react-icons/fa'
import './style.scss'
import Img from 'gatsby-image'

import { CartContext } from './cart-provider'

const ProductListItem = ({ product }) => {
  const { add } = useContext(CartContext)

  const addToCart = (evt) => {
    evt.preventDefault()
    add(product.sku)
  }

  return (
    <div className="tile is-parent is-4" key={`product-${product.name}-sku-${product.sku}`}>
      <div className="card">
        <Img fluid={product.images[0].fluid} fadeIn={true} />
        <div className="card-content">
          <div className="content">
            <h5>{product.name}</h5>
            <p>{product.shortDescription}</p>
            <div className="has-text-primary bold has-text-right is-size-4">${product.price}</div>
          </div>
        </div>
        <div className="card-footer">
          <Link className="card-footer-item is-outlined list-item-details" to={`/products/${product.sku}`}>
            <span>Learn More</span>
          </Link>
          <a className="card-footer-item is-primary bold list-item-cta" onClick={(evt) => addToCart(evt)}>
            <span className="icon"><FaCartPlus/></span>
            <span>Add to Cart</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
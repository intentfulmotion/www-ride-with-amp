import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { FaCartPlus } from 'react-icons/fa'
import './list-item.scss'
import Img from 'gatsby-image'

import { CartContext } from '../cart-provider'

const ProductListItem = ({ product, compact }) => {
  const { add } = useContext(CartContext)

  const addToCart = (evt) => {
    evt.preventDefault()
    add(product.sku)
    document.getElementById('cart-modal').classList.add('is-active')
    document.getElementById('cart-modal').focus()
  }

  const size = compact ? 'is-3' : 'is-4'

  return (
    <div className={`column ${size}`} key={`product-${product.name}-sku-${product.sku}`}>
      <div className="card">
        <Link to={`/products/${product.sku}`}>
          <Img fluid={product.images[0].fluid} fadeIn={true} />
        </Link>
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
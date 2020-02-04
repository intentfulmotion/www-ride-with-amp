
import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import './style.scss'
import Img from 'gatsby-image'

const ProductListItem = ({ product }) => {
  return (
    <div className="tile is-3" key={`product-${product.name}-sku-${product.sku}`}>
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
          <a className="card-footer-item is-outlined list-item-details" href={`/products/${product.sku}`}>
            <span>Learn More</span>
          </a>
          <a className="card-footer-item is-primary bold list-item-cta snipcart-add-item"
            data-item-id={product.sku}
            data-item-price={product.price}
            data-item-url={`/products/${product.sku}`}
            data-item-description={product.shortDescription}
            data-item-image={product.images[0].file.url}
            data-item-name={product.name}
          >
            <span className="icon"><FaCartPlus/></span>
            <span>Add to Cart</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default ProductListItem
import React, { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import './style.scss';

import { CartContext } from './cart.provider'

const ProductSection = ({ product }) => {
  const { add } = useContext(CartContext)
  return (
    <div className="card" key={`product-${product.name}-sku-${product.sku}`}>
      <div className="card-image">
        <figure className="image is-3by2">
          { <img src={product.images[0].file.url} alt={product.name} /> }
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <p>{product.name}</p>
          <div className="is-primary bold">${product.price}</div>
        </div>
      </div>
       <div className="card-footer">
        <a className="card-footer-item button is-primary bold" onClick={() => { add(product.sku) }}>
          <span className="icon"><FaCartPlus/></span>
          <span>Add to Cart</span>
        </a>
      </div>
    </div>
  )
}

export default ProductSection
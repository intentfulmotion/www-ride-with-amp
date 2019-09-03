import React, { useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import './style.scss';

import { CartContext } from './cart.provider'

const ProductSection = ({ productId }) => {
  const { products, skus, add } = useContext(CartContext)
  let product = products.filter(p => p.id === productId)[0]
  let productSkus = skus.filter(s => s.product.id === productId)
  return (
    <section className="section">
      <div className="container content">
        <h3 className="title is-3 bold">{ product.name }</h3>
        <div className="columns">
          <div className="column is-4 product-description" dangerouslySetInnerHTML={{__html: product.metadata.description}}>
          </div>
          <div className="column is-offset-1">
            <div className="columns is-multiline">
            {
              productSkus
                .filter(sku => sku.active === true)                
                .map((sku, id) => (
                <div className="column is-4">
                  <div className="card" key={`product-${product.name}-sku-${id}`}>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={sku.images} alt={sku.name} />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="content">
                        <p>{sku.attributes.name}</p>
                        <div className="is-primary bold">${sku.price / 100}</div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a className="card-footer-item button is-primary bold" onClick={() => { add(sku.id) }}>
                        <span className="icon"><FaCartPlus/></span>
                        <span>Add to Cart</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductSection
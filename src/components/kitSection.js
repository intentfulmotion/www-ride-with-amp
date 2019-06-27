import React, { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { CartContext } from './cart.provider'

const KitSection = ({kit}) => {
  const { products, skus, add } = useContext(CartContext)
  let kitSkus = kit.skus.map(sku => { return { sku: `sku_${sku.sku}`, quantity: sku.quantity }})
  let inflatedSkus = kitSkus.map(sku => { return { ...skus.find(s => s.id === sku.sku), quantity: sku.quantity }})
  const total = inflatedSkus
                  .map(sku => { return sku.quantity * sku.price })
                  .reduce((total, current) => { return total + current})

  return (
    <div className="tile is-parent is-4 is-vertical box">
      <div className="card-content">
        <div className="content">
          <h3 className="title is-child is-4 bold">{kit.name}</h3>
          <p>{kit.description}</p>
          <p>Includes:</p>
          <ul>
            {
              inflatedSkus.map((sku, id) => (
                <li key={`kit-${kit.name}-${id}`}>{sku.attributes.name}</li>
              ))
            }
          </ul>
          <p className="bold">${total / 100}</p>
        </div>
      </div>
      <div className="card-footer">
        <a className="card-footer-item button is-primary bold" onClick={() => { kitSkus.forEach(sku => add(sku.sku,)) }}>
          <span className="icon"><FaCartPlus/></span>
          <span>Add to Cart</span>
        </a>
      </div>
    </div>
  )
}

export default KitSection
import React, { useContext } from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { CartContext } from '../components/cart.provider'

const CollectionSection = ({collection}) => {
  const { products, skus, add } = useContext(CartContext)
  let collectionSkus = collection.skus.map(sku => { return { sku: `sku_${sku.sku}`, quantity: sku.quantity }})
  let inflatedSkus = collectionSkus.map(sku => { return { ...skus.find(s => s.id === sku.sku), quantity: sku.quantity }})
  const total = inflatedSkus
                  .map(sku => { return sku.quantity * sku.price })
                  .reduce((total, current) => { return total + current})

  return (
    <div className="tile is-parent is-4 is-vertical card">
      <div className="card-content">
        <div className="content">
          <h3 className="title is-child is-4 bold">{collection.name}</h3>
          <p>{collection.description}</p>
          <p>Includes:</p>
          <ul>
            {
              inflatedSkus.map((sku, id) => (
                <li key={`collection-${collection.name}-${id}`}>{sku.attributes.name}</li>
              ))
            }
          </ul>
          <p className="bold">${total / 100}</p>
        </div>
      </div>
      <div className="card-footer">
        <button className="card-footer-item button is-primary" onClick={() => { collectionSkus.forEach(sku => add(sku.sku,)) }}>
          <span className="icon"><FaCartPlus/></span>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default CollectionSection
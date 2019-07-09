import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const CartContext = React.createContext()

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */
const CartProvider = ({ children, skus, products }) => {
  const [mode, setMode] = useState(false)
  let skuList = {}
  skus.forEach(s => {
    skuList[s.id] = s
  })

  /** Load cart from local storage. Initialize if not present or incorrect. */
  const [contents, setContents] = useState(() => {
    let localCart
    try {
      localCart = JSON.parse(localStorage.getItem('amp-cart'))
    } catch (err) {
      console.error(err.message)
    }
    if (!localCart || !Array.isArray(localCart)) return []
    return localCart
  })

  /** Save cart to local storage after load and on update */
  useEffect(() => {
    try {
      localStorage.setItem('amp-cart', JSON.stringify(contents))
    } catch (err) {
      console.error(err)
    }
  }, [contents])

  /** An array representing the cart in the form of [{sku}, quantity] */
  const cart = contents.map(([id, quantity]) => {
    return [skuList[id], quantity]
  })

  /** The number of items in the cart */
  const count = contents.reduce((sum, [_, quantity]) => sum + quantity, 0)

  /** The total cost of the items in the cart */
  const total = contents.reduce(
    (sum, [id, quantity]) => sum + skuList[id].price * quantity,
    0
  )

  /** Sets quantity of item with `id` */
  function set(id, quantity) {
    if (!available(id)) return

    const index = contents.findIndex(item => item[0] === id)
    setContents(state => {
      const newState = [...state]
      if (index !== -1) {
        newState[index] = [id, quantity]
      } else {
        newState.push([id, quantity])
      }
      return newState
    })
  }

  /** Increments item with `id` by `quantity`, which defaults to 0 */
  function add(id, quantity = 1) {
    const currentItem = contents.find(item => item[0] === id)
    const currentQuantity = currentItem ? currentItem[1] : 0
    set(id, quantity + currentQuantity)
  }

  /** Removes item with `id` */
  function remove(id) {
    setContents(state => {
      return state.filter(item => item[0] !== id)
    })
  }

  /** Returns true if `quantity` of item with `id` is available for purchase */
  function available(id, quantity = 1) {
    const sku = skuList[id]
    if (!sku) {
      console.error(`Sku with id ${id} not found`)
      return false
    } else if (!sku.active) {
      return false
    } else {
      return true
    }
  }

  /** Toggles cart display, or sets to the boolean `force` if provided */
  function toggle(force) {
    setMode(prev => force || !prev)
  }

  const ctx = {
    contents,
    cart,
    add,
    set,
    remove,
    available,
    toggle,
    count,
    total,
    mode,
    skus,
    products
  }

  return (
    <CartContext.Provider value={{...ctx}}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.any.isRequired
}

export default CartProvider

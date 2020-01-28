import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const CartContext = React.createContext()

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */
const CartProvider = ({ children, products }) => {
  const [mode, setMode] = useState(false)
  let productList = {}
  products.forEach(p => {
    productList[p.sku] = p
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
    return [productList[id], quantity]
  })

  /** The number of items in the cart */
  const count = contents.reduce((sum, [_, quantity]) => sum + quantity, 0)

  /** The total cost of the items in the cart */
  const total = contents.reduce(
    (sum, [sku, quantity]) => sum + productList[sku].price * quantity,
    0
  )

  /** Sets quantity of item with `id` */
  function set(sku, quantity) {
    if (!available(sku)) return

    const index = contents.findIndex(item => item[0] === sku)
    setContents(state => {
      const newState = [...state]
      if (index !== -1) {
        newState[index] = [sku, quantity]
      } else {
        newState.push([sku, quantity])
      }
      return newState
    })
  }

  /** Increments item with `id` by `quantity`, which defaults to 0 */
  function add(sku, quantity = 1) {
    const currentItem = contents.find(item => item[0] === sku)
    const currentQuantity = currentItem ? currentItem[1] : 0
    set(sku, quantity + currentQuantity)
  }

  /** Removes item with `id` */
  function remove(sku) {
    setContents(state => {
      return state.filter(item => item[0] !== sku)
    })
  }

  /** Returns true if `quantity` of item with `id` is available for purchase */
  function available(sku, quantity = 1) {
    const product = productList[sku]
    if (!product) {
      console.error(`Product with sku ${sku} not found`)
      return false
    } else if (!product.active) {
      console.error(`Product with sku ${sku} is not active`)
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

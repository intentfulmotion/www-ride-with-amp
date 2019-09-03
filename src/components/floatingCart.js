import React, { useContext } from 'react'
import { CartContext } from './cart.provider'

import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import { FaShoppingCart } from 'react-icons/fa'

const FloatingCart = () => {
  const { count } = useContext(CartContext)

  if (count > 0) {
    const useStyles = makeStyles(theme => ({
      fab: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        zIndex: 99
      }
    }))

    const showCart = () => {
      const cart = document.getElementById('shopping-cart')
      cart.classList.toggle('is-active')
      cart.scrollIntoView(true)
    }

    const classes = useStyles()

    return (
      <Fab color="primary" aria-label="Cart" className={classes.fab} onClick={() => { window.location.href = "https://store.intentfulmotion.com" }}>
        <FaShoppingCart /><span>&nbsp;{ count }</span>
      </Fab>
    )
  }
  else {
    return (<></>)
  }
}

export default FloatingCart
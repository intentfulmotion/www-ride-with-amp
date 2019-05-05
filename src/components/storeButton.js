import React from 'react';
import './style.scss';

import { useSiteMetadata } from "../hooks/use-site-metadata"

const StoreButton = (props) => {
  const { storeLink } = useSiteMetadata()
  let classes = 'has-text-white'

  if (!props.cardFooter)
    classes += ' button is-primary'
  else
    classes += ' card-footer-item'

  if (!props.comingSoon || props.comingSoon === false)
    return (
      <a className={classes} data-celery={storeLink.collection}>{storeLink.text}</a>
    )
  else {
    classes += ' is-disabled'
    return (
      <a className={classes}>Coming Soon!</a>
    )
  }
}

export default StoreButton
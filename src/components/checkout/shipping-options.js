import React, { useContext, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { CartContext } from '../cart-provider'
import { FormattedNumber } from 'react-intl'

export const LoadingShippingOptions = () => (
  <h2><span className="icon has-text-info"><FaSpinner className="fa-spin" /></span> Getting shipping options...</h2>
)

export const ShippingOptionsView = ({ options, onSelected }) => {
  return (
    <div className="content">
      {
        options.map(o => {
          let fastest = o.attributes.includes("FASTEST") ? (<span className="tag is-primary">Fastest</span>) : (<span></span>)
          let bestValue = o.attributes.includes("BEST_VALUE") ? (<span className="tag is-info">Best Value</span>) : (<span></span>)
          let cheapest = o.attributes.includes("CHEAPEST") ? (<span className="tag is-success">Cheapest</span>) : (<span></span>)
          return (
            <article key={`shipping-option-${o.object_id}`} className="media shipping-option" onClick={() => { onSelected(o) }}>
              <figure className="media-left">
                <p className="image"><img src={o.provider_image_75} alt={o.provider} /></p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>{o.servicelevel.name}</p>
                  <p className="duration-terms">{o.duration_terms}</p>
                  {fastest} {bestValue} {cheapest}
                </div>
              </div>
              <div className="media-right">
                <h6 className="shipping-price"><FormattedNumber value={o.amount_local} style="currency" currency={o.currency_local} minimumFractionDigits={2} maximumFractionDigits={2} /></h6>
              </div>
            </article>
        )}
      )}
    </div>
  )
}

export const ErrorLoadingShippingOptions = ({ error, reload }) => (
  <div>
    <h2>{ error }</h2>
    <div className="has-text-centered">
      <button className="button is-primary" onClick={() => reload()}>Try again</button>
    </div>
  </div>
)

export default ({address, onSelected}) => {
  let [shippingOptions, setShippingOptions] = useState({ rates: [], loadedRates: false, error: null })  
  let { cart } = useContext(CartContext)

  const loadShippingOptions = async () => {
    try {
      let items = cart.reduce((res, item) => {
        res[item[0].sku] = item[1]
        return res
      }, {})

      let result = await fetch('/.netlify/functions/rates', {
        method: 'POST',
        body: JSON.stringify({ address, items })
      })

      let rates = await result.json()

      setShippingOptions({ rates: rates, error: null, loadedRates: true })
    }
    catch (err) {
      console.log(err)
      setShippingOptions({ error: err, rates: [], loadedRates: true })
    }
  }

  const reload = async () => {
    setShippingOptions({ error: null, loadedRates: false, rates: [] })
  }

  let { rates, error, loadedRates } = shippingOptions

  let content = null

  if (error)
    content = <ErrorLoadingShippingOptions error={error} reload={loadShippingOptions} />
  else if (!loadedRates) {
    content = <LoadingShippingOptions />
    loadShippingOptions()
  }
  else if (loadedRates && rates.length == 0)
    content = <ErrorLoadingShippingOptions error="No shipping rates found" reload={reload} />
  else
    content = <ShippingOptionsView options={rates} onSelected={onSelected} />

  return (
    <div className="card checkout-card">
      <div className="card-content">
        <h2 className="subtitle">Shipping Option</h2>
        { content }
      </div>
    </div>
  )
}

export const ShippingSummary = ({rate, onEdit}) => {
  if (!onEdit)
  onEdit = () => {}

  return (
    <div className="card checkout-card">
      <header className="card-header">
        <p className="card-header-title">
          Shipping Option
        </p>
        <button href="" className="card-header-icon button has-text-info is-text" aria-label="more options" onClick={() => onEdit()}>
          <span className="icon">
            <MdEdit />
          </span>
        </button>
      </header>
      <div className="card-content">
        <article className="media shipping-option">
          <figure className="media-left">
            <p className="image"><img src={rate.provider_image_75} alt={rate.provider} /></p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>{rate.servicelevel.name}</p>
              <p className="duration-terms">{rate.duration_terms}</p>
            </div>
          </div>
          <div className="media-right">
            <h6 className="shipping-price"><FormattedNumber value={rate.amount_local} style="currency" currency={rate.currency_local} minimumFractionDigits={2} maximumFractionDigits={2} /></h6>
          </div>
        </article>
      </div>
    </div>
  )
}
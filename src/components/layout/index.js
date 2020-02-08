import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { useSiteMetadata } from '../../hooks/use-site-metadata'

import './layout.scss'
import Helmet from '../helmet'
import Footer from '../footer'

export default ({ children, title, description, tags }) => {
  const { snipcartKey } = useSiteMetadata()
  return (
  <StaticQuery
    query={graphql`
      query SkuQuery { 

        products: allContentfulProduct {
          edges {
            node {
              name
              sku
              price
              images {
                file { url }
              }
              active
              parcel {
                length
                width
                height
                weight
              }
              length
              width
              height
              weight
              unitsPerParcel
            }
          }
        }
      }  
    `}
    render={({ products }) => (
      <div>
        <Helmet title={title} description={description} tags={tags} />
        {children}
        <Footer />
        <div hidden id="snipcart" data-api-key={snipcartKey}></div>
      </div>
    )}
  />
)}
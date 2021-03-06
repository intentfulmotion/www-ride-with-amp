import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import CartProvider from '../cart-provider'
import { IntlProvider } from 'react-intl'
import CartModal from '../cart-modal'

import './layout.scss'
import Footer from '../footer'

export default ({ children, title, description, tags }) => {
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
                fluid(maxWidth: 720) {
                  ...GatsbyContentfulFluid
                }
              }
              active
            }
          }
        }
      }  
    `}
    render={({ products }) => (
      <IntlProvider locale="en">
        <CartProvider products={products.edges.map(edge => edge.node)}>
          {children}
          <Footer />
          <CartModal />
        </CartProvider>
      </IntlProvider>
    )}
  />
)}
import React, { useContext } from 'react'
import { StaticQuery, graphql } from "gatsby"

import './style.scss'
import Helmet from './helmet'
import Footer from './footer'
import Cart from './cart'

import CartProvider from './cart.provider'

export default ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SkuQuery {
          skus: allStripeSku {
            edges {
              node {
                id
                price
                currency
                product {
                  id
                  name
                }
                attributes {
                  name
                }
                active
              }
            }
          }
  
          products: allStripeProduct {
            edges {
              node {
                id
                name
                metadata {
                  version
                  description
                }
              }
            }
          }
        }  
      `}
      render={({ products, skus }) => (
        <div>
          <Helmet />
          <CartProvider products={products.edges.map(edge => edge.node)} skus={skus.edges.map(edge => edge.node)}>
            {children}
            <Footer />
            <Cart />
          </CartProvider>
        </div>
      )}
    />
  );
}
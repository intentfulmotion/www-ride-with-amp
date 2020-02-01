import React from 'react'
import { StaticQuery, graphql } from "gatsby"

import './style.scss'
import Helmet from './helmet'
import Footer from './footer'
import Cart from './cart'

import CartProvider from './cart.provider'
import FloatingCart from './floatingCart'

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
                length
                width
                depth
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
                depth
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
          <CartProvider products={products.edges.map(edge => edge.node)}>
            {children}
            <Footer />
            <Cart />
            <FloatingCart />
          </CartProvider>
        </div>
      )}
    />
  );
}
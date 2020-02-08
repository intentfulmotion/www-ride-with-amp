import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import SubscribeSection from '../components/subscribe'

import Carousel from '../components/Carousel/carousel'

export default ({ data }) => {
  const product = data.contentfulProduct
  const addToCart = product.active ? (
    <div>
      <button className="button is-primary"
        data-item-id={product.sku}
        data-item-price={product.price}
        data-item-url={`/products/${product.sku}`}
        data-item-description={product.shortDescription}
        data-item-image={product.images[0].file.url}
        data-item-name={product.name}>
        Add to Cart
      </button>
      <span className="subtitle is-4 product-price">${product.price}</span>
    </div>
  ) : (<div></div>)

  return (
    <Layout title={product.name} description={product.shortDescription} tags={product.tags}>
      <Navbar invert={true} />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-two-thirds">
              <Carousel images={product.images} />
            </div>
            <div className="column">
              <h1 className='title has-text-black'>{product.name}</h1>
              <h2 className='subtitle'>{product.active ? "In stock" : "Out of stock"}</h2>
              {addToCart}
              <div className="content product-description"
                dangerouslySetInnerHTML={{
                  __html: product.description.childMarkdownRemark.html,
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <SubscribeSection />
    </Layout>
  )
}
export const productQuery = graphql`
  query ProductBySku($sku: String!) {
    contentfulProduct(sku: { eq: $sku }) {
      name
      sku
      price
      active
      shortDescription
      description {
        childMarkdownRemark {
          html
        }
      }
      tags
      images {
        fluid(maxWidth: 250) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
      length
      width
      height
      weight
    }
  }
`
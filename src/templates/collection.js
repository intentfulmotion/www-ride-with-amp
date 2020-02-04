import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import ProductListItem from '../components/productListItem'
import SubscribeSection from '../components/subscribe'
import ampLogo from '../images/amp-icon.svg'

export default ({ data }) => {
  const collection = data.contentfulProductCollection
  let heroStyle = null;

  if (collection.featuredImage)
    heroStyle = {
      backgroundImage: `url(${collection.featuredImage.file.url})`,
      backgroundPosition: `center 60%`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
      color: `#fff`
    }

  return (
    <Layout title={collection.name} description={collection.description}>
      <section className="hero is-info" style={heroStyle}>
        <Navbar />
        <figure className="image is-64x64 brand-icon-mobile is-hidden-tablet">
          <a href="/"><img src={ampLogo} alt="Logo" /></a>
        </figure>
        <div className="hero-body">
          <div className="container">
            <h1 className="hero-product-title">{collection.name}</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            {
              collection.products.filter(p => p.active).map((product, i) => <ProductListItem product={product} key={`product-${i}`}></ProductListItem>)
            }
          </div>
        </div>
      </section>
      <SubscribeSection />
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProductCollectionBySlug($slug: String!) {
    contentfulProductCollection(slug: { eq: $slug }) {
      name
      description
      slug
      featuredImage { 
        file {
          url
        }
      }
      products {
        name
        active
        sku
        price
        shortDescription
        tags
        images {
          fluid(maxWidth: 250) {
            ...GatsbyContentfulFluid
          }
          file {
            url
          }
        }
      }
    }
  }
`
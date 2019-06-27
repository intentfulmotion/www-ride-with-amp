import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import ProductSection from '../components/productSection'

export default ({ props, data }) => {
  const productCollection = data.productCollections

  let allFeatured = productCollection.collections.filter(c => c.featured === true)
  let featured = null

  // choose a random feature collection
  if (allFeatured.length > 0)
    featured = allFeatured[Math.floor(Math.random() * allFeatured.length)]

  if (featured)
    return CollectionWithFeature(productCollection, props, featured)
  else
    return (<Layout></Layout>)
}

const CollectionWithFeature = (data, props, feature) => {
  const heroStyle = {
    backgroundImage: `url(${feature.image.childImageSharp.fluid.src})`,
    backgroundPosition: `center 60%`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    color: `#fff`
  }

  const titleStyle = {
    fontFamily: `KiloGram`,
    fontSize: `6rem`,
    lineHeight: `7rem`,
    color: `#fff`
  }

  return (
    <Layout>
      <section className="hero" style={heroStyle}>
        <Navbar />
        <div className="hero-body">
          <div className="container">
            <h1 style={titleStyle}>{data.title}</h1>
          </div>
        </div>
        <div className="hero-footer">
          <div className="container">
            <span>{feature.name}</span>
          </div>
        </div>
      </section>
        { 
          data.products.map((product, i) => <ProductSection productId={product} key={`product-${i}`}></ProductSection>)
        }
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    productCollections(fields: { slug: { eq: $slug } }) {
      title
      description
      collections {
        name
        image {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        products {
          id
        }
        skus {
          sku
          quantity
        }
        featured
      }
      products
    }
  }
`
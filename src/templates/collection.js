import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'

import Navbar from '../components/navbar'
import ProductListItem from '../components/product-list-item'
import SubscribeSection from '../components/subscribe'

export default ({ data }) => {
  const collection = data.contentfulProductCollection
  const { title, author } = useSiteMetadata()
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
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={collection.shortDescription} />
        <meta name="keywords" content={[].concat(collection.tags, ',')} />
        <title>{collection.name} | {title}</title>
        <html lang="en" />
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={collection.shortDescription} />
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
      </Helmet>
      <section className="hero" style={heroStyle}>
        <Navbar invert={collection.featuredImage == null} />
        <div className="hero-body">
          <div className="container">
            <h1 className="hero-product-title">{collection.name}</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-multiline">
            {
              collection.products.filter(p => p.active).map((product, i) => <ProductListItem compact={true} product={product} key={`product-${i}`}></ProductListItem>)
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
      tags
      products {
        name
        active
        sku
        price
        shortDescription
        tags
        images {
          fluid(maxWidth: 720) {
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
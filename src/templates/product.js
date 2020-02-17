import React, { useContext } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'

import Navbar from '../components/navbar'
import SubscribeSection from '../components/subscribe'
import ProductDetail from '../components/product-detail'

export default ({ data }) => {
  const product = data.contentfulProduct
  const { title, author } = useSiteMetadata()

  return (
    <Layout>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={product.shortDescription} />
        <meta name="keywords" content={[].concat(product.tags, ',')} />
        <title>{product.name} | {title}</title>
        <html lang="en" />
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={product.shortDescription} />
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
      </Helmet>
      <Navbar invert={true} />
        <ProductDetail product={product} />
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
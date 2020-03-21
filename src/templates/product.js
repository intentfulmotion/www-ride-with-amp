import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'

import Navbar from '../components/navbar'
import SubscribeSection from '../components/subscribe'
import ProductDetail from '../components/product-detail'

export default ({ data }) => {
  const product = data.contentfulProduct
  const { title, description, author, siteUrl, slogan } = useSiteMetadata()

  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    "brand": {
      "@type": "Brand",
      "name": title,
      "slogan": slogan,
      "description": description,
      "url": siteUrl
    },
    "url": `${siteUrl}/products/${product.name}`,
    "name": product.name,
    "description": product.shortDescription,
    "sku": product.sku,
    "mpn": product.sku,
    "height": product.height,
    "width": product.width,
    "depth": product.length,
    "manufacturer": author,
    "image": product.images.map(i => i.file.url),
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${product.name}`,
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/PreOrder",
      "seller": {
        "@type": "Brand",
        "name": title,
        "slogan": slogan,
        "description": description,
        "url": siteUrl
      }
    }
  }

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
        <script type="application/ld+json">
          { JSON.stringify(structured) }
        </script>
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
      madeToOrder
      shortDescription
      description {
        childMarkdownRemark {
          html
        }
      }
      tags
      images {
        fluid(maxWidth: 720) {
          ...GatsbyContentfulFluid
        }
        file {
          url
        }
      }
      videos {
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
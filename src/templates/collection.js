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
  const { title, author, siteUrl } = useSiteMetadata()

  const structured = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": collection.products.filter(p => p.active).map((product, index) => {
      return {
        "@type": "ListItem",
        "position": index + 1,
        "url": `${siteUrl}/store/${product.sku}`
      }
    })
  }

  let heroStyle = null;

  if (collection.featuredImage)
    heroStyle = {
      backgroundImage: `url(${collection.featuredImage.file.url})`,
      backgroundPosition: `center 60%`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
      color: `#fff`
    }

  if (!collection.featuredImage)
    collection.featuredImage = { file: { url: '' } }  

  return (
    <Layout>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={collection.description} />
        <meta name="keywords" content={[].concat(collection.tags, ',')} />
        <title>{collection.name} | {title}</title>
        <html lang="en" />

        {/* Schema.org */}
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={collection.description} />
        <meta itemprop="image" content={collection.featuredImage.file.url} />

        {/* Twitter Card */}
        <meta name="twitter:card" />
        <meta name="twitter:site" content="@publisher_handle" />
        <meta name="twitter:title" content={`${collection.name} | ${title}`} />
        <meta name="twitter:description" content={collection.description} />
        <meta name="twitter:creator" content="@ridewithamp" />
        <meta name="twitter:image" content={`https:${collection.featuredImage.file.url}`} />
        <meta name="twitter:image:alt" content={collection.name} />

        {/* Open Graph */}
        <meta property="og:title" content={`${collection.name} | ${title}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/${collection.slug}`} />
        <meta property="og:image" content={`https:${collection.featuredImage.file.url}`} />
        <meta property="og:description" content={collection.description} />
        <meta property="og:site_name" content={title} />
        
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
        <script type="application/ld+json">
          { JSON.stringify(structured) }
        </script>
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
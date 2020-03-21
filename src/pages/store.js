import React from 'react'
import Helmet from 'react-helmet'
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import { useSiteMetadata } from '../hooks/use-site-metadata'
import { graphql, Link } from 'gatsby'

import ProductListItem from '../components/product-list-item'

const ShopPage = ({ data }) => {
  const { title, description, keywords, author } = useSiteMetadata()
  const categories = data.allContentfulProductCollection.edges.map(node => node.node)
  const products = data.allContentfulProduct.edges.map(node => node.node)
  return (
    <Layout>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>Store | {title}</title>
        <html lang="en" />
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={description} />
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
      </Helmet>
      <Navbar invert={true} />
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-2">
              <aside className="menu">
                <p className="menu-label">Category</p>
                <ul className="menu-list">
                  {
                    categories.map(c => (
                      <li key={`menu-collection-${c.slug}`}><Link to={c.slug} title={c.name}>{c.name}</Link></li>
                    ))
                  }
                </ul>
              </aside>
            </div>
            <div className="column">
              <div className="columns is-multiline">
                {
                  products.map(product => (
                    <ProductListItem product={product} key={`product-${product.sku}`}></ProductListItem>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ShopPage

export const query = graphql`
  query {
    allContentfulProductCollection {
      edges {
        node {
          name
          slug
          description
        }
      }
    }

    allContentfulProduct(filter: {active: {eq: true}}) {
      edges {
        node {
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
  }
`
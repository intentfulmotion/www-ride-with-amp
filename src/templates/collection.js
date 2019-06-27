import React from 'react'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import ProductSection from '../components/productSection'
import KitSection from '../components/kitSection'
import SubscribeSection from '../components/subscribe'

export default ({ pageContext }) => {
  const collection = pageContext.node
  const kits = collection.kits

  let allFeatured = kits.filter(c => c.featured === true)
  let featured = null

  // choose a random feature collection
  if (allFeatured.length > 0)
    featured = allFeatured[Math.floor(Math.random() * allFeatured.length)]

  if (featured)
    return CollectionWithFeature(collection, featured)
  else
    return (<Layout></Layout>)
}

const CollectionWithFeature = (collection, feature) => {
  let heroStyle;
  if (feature.images) {
    heroStyle = {
      backgroundImage: `url(${feature.images[0].fluid.src})`,
      backgroundPosition: `center 60%`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `cover`,
      color: `#fff`
    }
  }

  const titleStyle = {
    fontFamily: `KiloGram`,
    fontSize: `6rem`,
    lineHeight: `7rem`,
    color: `#fff`
  }

  return (
    <Layout>
      <section className="hero is-info" style={heroStyle}>
        <Navbar />
        <div className="hero-body">
          <div className="container">
            <h1 style={titleStyle}>{collection.name}</h1>
          </div>
        </div>
        <div className="hero-footer has-text-right">
          <div className="container">
            <span>{feature.name}</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            {
              collection.kits.map((kit, i) => <KitSection kit={kit} key={`kit-${i}`}></KitSection>)
            }
          </div>
        </div>
      </section>
      { 
        collection.products.map((product, i) => <ProductSection productId={`prod_${product}`} key={`product-${i}`}></ProductSection>)
      }
      <SubscribeSection />
    </Layout>
  )
}
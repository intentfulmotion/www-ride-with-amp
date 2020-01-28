import React from 'react'

import Layout from '../components/layout'
import Navbar from '../components/navbar'
import ProductSection from '../components/productSection'
import SubscribeSection from '../components/subscribe'
import ampLogo from '../images/amp-icon.svg';

export default ({ pageContext }) => {
  const collection = pageContext.node
  console.log(collection)

  if (collection.featuredImage.file.url)
    return CollectionWithFeature(collection)
  else
    return (<Layout></Layout>)
}

const CollectionWithFeature = (collection) => {
  let heroStyle;
  heroStyle = {
    backgroundImage: `url(${collection.featuredImage.file.url})`,
    backgroundPosition: `center 60%`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    color: `#fff`
  }

  return (
    <Layout>
      <section className="hero is-info" style={heroStyle}>
        <Navbar />
        <figure className="image is-64x64 brand-icon-mobile is-hidden-tablet">
          <a href="/"><img src={ampLogo} alt="Logo" /></a>
        </figure>
        <div className="hero-body">
          <div className="container">
            <h1 className="hero-kit-title">{collection.name}</h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            {
              collection.products.map((product, i) => <ProductSection product={product} productId={`prod_${product}`} key={`product-${i}`}></ProductSection>)
            }
          </div>
        </div>
      </section>
      <SubscribeSection />
    </Layout>
  )
}
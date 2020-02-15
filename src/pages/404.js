import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Navbar from "../components/navbar"
import AmpLogo from '../images/amp-icon.svg'
import { useSiteMetadata } from '../hooks/use-site-metadata'

const NotFoundPage = () => {
  const { title, description, keywords, author } = useSiteMetadata()
  return (
    <Layout>
      <Navbar invert={true} />
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>Not Found | {title}</title>
        <html lang="en" />
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={description} />
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered center-content">
            <div className="column has-text-centered">
              <img className="invalid-content-logo" src={AmpLogo} alt="Amp" />
              <h3 className="subtitle">There's nothing at that link...sorry.</h3>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NotFoundPage

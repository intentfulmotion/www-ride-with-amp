import React from 'react'

import Layout from '../components/layout'
import Helmet from 'react-helmet'
import Header from '../components/header'

import WhatSection from '../components/home/what'
import SpecSection from '../components/home/specs'
import MixerSection from '../components/home/mixer'

import SubscribeSection from '../components/subscribe'
import KiloGram from '../fonts/kilogram.otf'

import { useSiteMetadata } from '../hooks/use-site-metadata'

export default () => {
  const { title, description, keywords, author, siteUrl } = useSiteMetadata()
  return (
    <Layout>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>Smart Lights for Your Ride | {title}</title>
        <html lang="en" />

        {/* Schema.org */}
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={description} />
        {/* <meta itemprop="image" content={collection.featuredImage.file.url} /> */}

        {/* Twitter Card */}
        <meta name="twitter:card" />
        <meta name="twitter:site" content="@publisher_handle" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:creator" content="@ridewithamp" />
        {/* <meta name="twitter:image" content={`https:${collection.featuredImage.file.url}`} /> */}
        <meta name="twitter:image:alt" content={title} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        {/* <meta property="og:image" content={`https:${collection.featuredImage.file.url}`} /> */}
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={title} />

        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
        <link rel="preload" as="font" href={KiloGram} type="font/otf" crossOrigin="anonymous" />
      </Helmet>
  
      <Header />
      <WhatSection />
      <SpecSection />
      <MixerSection />
      <SubscribeSection />
    </Layout>
  )
}

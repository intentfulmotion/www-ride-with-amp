import React from 'react'

import Layout from '../components/layout'
import Helmet from 'react-helmet'
import Header from '../components/header'

import WhatSection from '../components/home/what'
import SpecSection from '../components/home/specs'
import MixerSection from '../components/home/mixer'
import KitSection from '../components/home/kits'

import SubscribeSection from '../components/subscribe'
import KiloGram from '../fonts/kilogram.otf'

import { useSiteMetadata } from '../hooks/use-site-metadata'

export default () => {
  const { title, description, keywords, author } = useSiteMetadata()
  return (
    <Layout>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
        <html lang="en" />
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={description} />
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
        <link rel="preload" as="font" href={KiloGram} type="font/otf" crossOrigin="anonymous" />
      </Helmet>
  
      <Header />
      <WhatSection />
      <SpecSection />
      <MixerSection />
      <KitSection />
      <SubscribeSection />
    </Layout>
  )
}

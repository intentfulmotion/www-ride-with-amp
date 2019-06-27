import React from 'react'

import Layout from '../components/layout'
import Header from '../components/header'
import WhatSection from '../components/what'
import SpecSection from '../components/specs'
import MixerSection from '../components/mixer'
import KitSection from '../components/kits'
import SubscribeSection from '../components/subscribe'

export default () => (
  <Layout>
    <Header />
    <WhatSection />
    <SpecSection />
    <MixerSection />
    <KitSection />
    <SubscribeSection />
  </Layout>
)
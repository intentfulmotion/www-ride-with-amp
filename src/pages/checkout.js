import React, { useEffect } from 'react'
import withLocation from "../components/withLocation"

import Layout from '../components/layout'
import Helmet from 'react-helmet'
import { useSiteMetadata } from '../hooks/use-site-metadata'

import Navbar from '../components/navbar'
import Checkout from '../components/checkout'

/*
  Checkout states
  1. view cart -> begin checkout
  2. gather shipping info -> get shipping options
  3. provide / select shipping options -> view cart summary
  4. cart summary (discount code options) -> pay
  5. jump to checkout
  6. ???
  7. profit
*/

const CheckoutPage = ({ search }) => {
  const { cancel, success, reference } = search
  const { title, description, author } = useSiteMetadata()

  return (
    <Layout title="Checkout" extras={[<script src="https://js.stripe.com/v3/" async></script>]}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"	/>	
        <meta name="description" content={description} />
        <title>Checkout | {title}</title>
        <html lang="en" />
        <meta itemprop="name" content={author} />
        <meta itemprop="description" content={description} />
        <link rel="stylesheet" href="https://use.typekit.net/fqo0mlk.css" />
      </Helmet>
      <Navbar invert={true} />
      <Checkout success={success} reference={reference} />
    </Layout>
  )
}

export default withLocation(CheckoutPage)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const contentful = require('contentful')
const xkcdPassword = require('xkcd-z-password').init();

const contentfulClient = contentful.createClient({
  space: `smrlz4o6hk32`,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  if (event.httpMethod == 'OPTIONS')
    return { statusCode: 200, body: '' }

  try {
    const { items, email, shipping, success_url, cancel_url } = JSON.parse(event.body)

    let { items: results } = await contentfulClient.getEntries({
      'fields.sku[in]': ''.concat(Object.keys(items), ','),
      'content_type': 'product'
    })

    let line_items = results.reduce((result, entry) => {
      let { fields: product } = entry
      result.push({ amount: (product.price * 100).toFixed(0), currency: 'usd', name: product.name, description: product.shortDescription, quantity: items[product.sku], images: product.images.map(i => `https:${i.fields.file.url}`) })
      return result
    }, [])

    let reference = await xkcdPassword.generate(4)
    console.log(reference.join('-'))

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      client_reference_id: reference.join('-'),
      line_items: line_items,
      locale: 'auto',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      payment_intent_data: {
        receipt_email: email,
        setup_future_usage: "on_session",
        shipping: shipping
      },
      submit_type: 'pay',
      success_url: `${success_url}&reference=${reference.join('-')}`,
      cancel_url, cancel_url
    })

    return { statusCode: 200, body: JSON.stringify({ id: session.id })}
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
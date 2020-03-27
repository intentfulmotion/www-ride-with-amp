const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const contentful = require('contentful')
const xkcdPassword = require('xkcd-z-password').init();
stripe.setApiVersion('2020-03-02')

const contentfulClient = contentful.createClient({
  space: `smrlz4o6hk32`,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  if (event.httpMethod == 'OPTIONS')
    return { statusCode: 200, body: '' }

  try {
    const { items, email, customer, shipping, success_url, cancel_url } = JSON.parse(event.body)

    let { items: results } = await contentfulClient.getEntries({
      'fields.sku[in]': ''.concat(Object.keys(items), ','),
      'content_type': 'product'
    })

    let totalWeight = 0
    let line_items = results.reduce((result, entry) => {
      let { fields: product } = entry
      totalWeight += product.weight
      result.push({ amount: (product.price * 100).toFixed(0), currency: 'usd', name: product.name, description: product.shortDescription, quantity: items[product.sku], images: product.images.map(i => `https:${i.fields.file.url}`) })
      return result
    }, [])

    var shippingInternational = shipping.address.country != 'US'

    if (shippingInternational)
      line_items.push({ amount: 20 * 100, currency: 'usd', name: 'Flat Rate International Shipping', description: 'Shipping outside of the U.S.', quantity: 1 })

    let reference = await xkcdPassword.generate(4)
    console.log(reference.join('-'))

    let options = {
      client_reference_id: reference.join('-'),
      line_items: line_items,
      locale: 'auto',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      payment_intent_data: {
        receipt_email: email,
        setup_future_usage: "on_session",
        shipping: shipping,
        metadata: {
          international: shippingInternational,
          weight: totalWeight
        }
      },
      submit_type: 'pay',
      success_url: `${success_url}&reference=${reference.join('-')}`,
      cancel_url, cancel_url
    }

    results.forEach(r => {
      options.payment_intent_data.metadata[r.fields.sku] = JSON.stringify({ title: r.fields.name, quantity: items[r.fields.sku], sku: r.fields.sku, price: r.fields.price, total_price: (r.fields.price * items[r.fields.sku]).toFixed(2), image: r.fields.images[0].fields.file.url })
    })

    if (customer)
      options.customer = customer
    else
      options.customer_email = email

    const session = await stripe.checkout.sessions.create(options)

    return { statusCode: 200, body: JSON.stringify({ id: session.id })}
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const drip = require('drip-nodejs')({ token: process.env.DRIP_API_KEY, accountId: process.env.DRIP_ACCOUNT_ID })
const axios = require("axios").default
const fromAddress = JSON.parse(process.env.FROM_ADDRESS)

stripe.setApiVersion('2020-03-02')

const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS, POST"
};

async function notifyShippo(payment_intent, products, client_reference_id) {
    let { shipping, receipt_email, amount, currency, metadata } = payment_intent
    let toAddress = {
      name: shipping.name,
      phone: shipping.phone,
      street1: shipping.address.line1,
      street2: shipping.address.line2,
      city: shipping.address.city,
      state: shipping.address.state,
      zip: shipping.address.postal_code,
      country: shipping.address.country,
      email: receipt_email
    }

    let shippo_options = {
      to_address: toAddress,
      from_address: fromAddress,
      order_status: "PAID",
      placed_at: new Date().toISOString(),
      shipping_cost: 0,
      shipping_cost_currency: 'USD',
      line_items: products.map(p => { return { 
        ...p,
        manufacture_country: 'US',
        currency: 'USD'
      }}),
      total_price: (amount / 100.0),
      total_tax: 0,
      currency: currency.toUpperCase(),
      weight: metadata.weight,
      weight_unit: 'g',
      notes: client_reference_id
    }

    // Shippo Node.js module doesn't yet support the Orders API for some reason
    let result = await axios.post(`https://api.goshippo.com/orders/`, shippo_options, {
      headers: { 'Authorization': `ShippoToken ${process.env.SHIPPO_API_KEY}`}
    })
}

async function notifyDrip(id, payment_intent, products, client_reference_id) {
  let { shipping, receipt_email, amount, metadata, currency } = payment_intent
  products = products.map(p => ({
    name: p.title,
    sku: p.sku,
    price: p.price,
    quantity: p.quantity,
    product_url: `https://ridewithamp.com/store/${p.sku}`,
    images: p.image
  }))

  let drip_options = {
    provider: 'amp-store',
    email: receipt_email,
    action: 'paid',
    order_id: id,
    order_public_id: client_reference_id,
    grand_total: amount / 100.0,
    total_shipping: metadata.international ? 20.00 : 0,
    currency: currency,
    items: products,
    shipping: {
      address1: shipping.line1,
      address_2: shipping.line2,
      ...shipping
    }
  }

  await drip.createUpdateOrderActivity(drip_options)
}

exports.handler = async (event, context) => {
  const { data, type } = JSON.parse(event.body)
  console.log(type)
  if (type == 'checkout.session.completed') {
    console.log('checkout completed')

    let { id, payment_intent: payment_intent_ref, client_reference_id } = data.object
    let payment_intent = await stripe.paymentIntents.retrieve(payment_intent_ref)
    let { metadata } = payment_intent
    let products = Object.keys(metadata)
      .filter(m => m != 'weight' && m != 'international')
      .map(key => JSON.parse(metadata[key]))

    try {
      await notifyShippo(payment_intent, products, data.object.client_reference_id)
      await notifyDrip(id, payment_intent, products, client_reference_id)
      
      console.log('added order')
    }
    catch (err) {
      console.error('add order error', err, err.stack)
    }
  }
  return { statusCode: 204, headers: headers, body: '' }
}
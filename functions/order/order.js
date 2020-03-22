const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const axios = require("axios").default
const fromAddress = JSON.parse(process.env.FROM_ADDRESS)

stripe.setApiVersion('2020-03-02')

const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS, POST"
};

function createShippoData(payment_intent) {
    let { shipping, receipt_email, amount, currency, metadata } = await stripe.paymentIntents.retrieve(data.object.payment_intent)
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

    return {
      to_address: toAddress,
      from_address: fromAddress,
      order_status: "PAID",
      placed_at: new Date().toISOString(),
      shipping_cost: 0,
      shipping_cost_currency: 'USD',
      line_items: Object.keys(metadata).filter(m => m != 'weight').map(key => { return { 
        ...JSON.parse(metadata[key]),
        manufacture_country: 'US',
        currency: 'USD'
      }}),
      total_price: (amount / 100.0).toFixed(2),
      total_tax: 0,
      currency: currency.toUpperCase(),
      weight: metadata.weight,
      weight_unit: 'g',
      notes: data.object.client_reference_id
    }
}

function createDripNotification() {

}

exports.handler = async (event, context) => {
  const { data, type } = JSON.parse(event.body)
  if (type == 'checkout.session.completed') {
    console.log('checkout completed')

    const options = createShippoData(data.object.payment_intent)

    try {
      // Shippo Node.js module doesn't yet support the Orders API for some reason
      let result = await axios.post(`https://api.goshippo.com/orders/`, options, {
        headers: { 'Authorization': `ShippoToken ${process.env.SHIPPO_API_KEY}`}
      })
      console.log('added order')
    }
    catch (err) {
      console.error('add order error', err)
    }
  }
  return { statusCode: 204, headers: headers, body: '' }
}
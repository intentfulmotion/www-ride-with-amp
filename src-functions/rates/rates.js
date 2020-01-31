let apiKey = process.env.SHIPPO_API_KEY_STAGING
if (process.env.FUNCTIONS_ENVIRONMENT === "production") {
  apiKey = process.env.SHIPPO_API_KEY_PRODUCTION
  console.log(`loading production key`)
}

const shippo = require("shippo")(apiKey)

let fromAddress = JSON.parse(process.env.FROM_ADDRESS)
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = async (event, context, callback) => {
  if(event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode: 400,
      headers,
    });
  }

  const data = JSON.parse(event.body)

  if (!data.toAddress || !data.parcels) {
    const error = `Missing to address or parcels`
    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: error })
    })
  }

  try {
    let shipment = await shippo.shipment.create({
      "address_from": fromAddress,
      "address_to": toAddress,
      "parcels": [data.parcels],
      "async": false
    })
    return {
      statusCode: 200,
      headers,
      body: shipment.rates
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}

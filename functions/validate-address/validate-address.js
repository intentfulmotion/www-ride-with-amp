const shippo = require("shippo")(process.env.SHIPPO_API_KEY)

let fromAddress = JSON.parse(process.env.FROM_ADDRESS)
const headers = {
  "Access-Control-Allow-Origin" : "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS, POST"
};

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: headers }
  }
  else if(event.httpMethod !== 'POST' || !event.body) {
    return { statusCode: 400, headers: headers }
  }

  const { address } = JSON.parse(event.body)

  if (!address) {
    const error = `Missing address`
    return { statusCode: 400, headers: headers, body: JSON.stringify({ error: error })}
  }

  try {
    let result = await shippo.address.create({
      ...address,
      validate: true
    })

    return { statusCode: 200, headers: headers, body: JSON.stringify(result.validation_results) }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
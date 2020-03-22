const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context) => {
  if (event.httpMethod == 'OPTIONS')
    return { statusCode: 200, body: '' }
  else if (event.httpMethod != 'POST')
    return { statusCode: 400, body: '' }

  let { email } = JSON.parse(event.body)
  if (!email || email.length === 0)
    return { statusCode: 400, body: JSON.stringify({ error: 'email required' }) }
 
  try {
    console.log(email)
    let results = await stripe.customers.list({ email: email, limit: 1 })    
    
    let { data: result } = await stripe.customers.list({ email: email, limit: 1 })
    if (result.length > 0)
      return { statusCode: 200, body: JSON.stringify({ id: result[0].id }) }
    else
      return { statusCode: 200, body: JSON.stringify({ id: null }) }
  }
  catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: err }) }
  }
}
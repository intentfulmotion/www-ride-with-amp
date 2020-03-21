exports.handler = async (event, context) => {
  return { statusCode: 200, body: JSON.stringify({ address: process.env.CONTACT_EMAIL }) }
}
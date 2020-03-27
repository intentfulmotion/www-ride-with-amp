const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions  
  const collectionTemplate = path.resolve('./src/templates/collection.js')
  const productTemplate = path.resolve('./src/templates/product.js')

  const result = await graphql(
    `
      {
        allContentfulProductCollection {
          edges {
            node {
              name
              slug
              products {
                sku
              }
            }
          }
        }
      }
    `
  )

  if (result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query: ${JSON.stringify(result.errors, null, 2)}`)

  const collections = result.data.allContentfulProductCollection.edges
  collections.forEach(collection => {
    createPage({
      path: `/${collection.node.slug}/`,
      component: collectionTemplate,
      context: {
        slug: collection.node.slug
      },
    })

    collection.node.products.forEach(product => {
      createPage({
        path: `/store/${product.sku}`,
        component: productTemplate,
        context: {
          sku: product.sku
        }
      })
    })
  })
}

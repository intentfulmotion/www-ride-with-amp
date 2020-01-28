const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContentfulProductCollection {
        edges {
          node {
            name
            description
            slug
            featuredImage {
              file { url }
            }
            products {
              name
              active
              sku
              price
              description {
                description
              }
              shortDescription          
              images {
                file { url }
              }
              length
              width
              depth
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${JSON.stringify(result.errors, null, 2)}`)
    return
  }

  const collectionTemplate = path.resolve(`src/templates/collection.js`)

  result.data.allContentfulProductCollection.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}`,
      component: collectionTemplate,
      context: { node }
    })
  })
}
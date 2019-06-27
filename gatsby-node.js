const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allContentfulProductCollection {
        edges {
          node {
            name
            description
            slug
            kits {
              name
              images {
                fluid(maxWidth: 1920) {
                  src
                  srcSet
                  base64
                }
              }
              skus {
                sku
                quantity
              }
              featured
            }
            products
          }
        }
      }
    }
  `)
  .then(result => {
    result.data.allContentfulProductCollection.edges.forEach(({node}) => {
      createPage({
        path: node.slug,
        component: path.resolve('./src/templates/collection.js'),
        context: {
          node
        }
      })
    })
  })
}
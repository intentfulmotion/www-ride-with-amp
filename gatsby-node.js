const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == 'ProductCollections') {
    const slug = createFilePath({ node, getNode, basePath: `collections`, trailingSlash: false })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allProductCollections {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  .then(result => {
    result.data.allProductCollections.edges.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/collection.js'),
        context: { 
          slug: node.fields.slug
        }
      })
    })
  })
}
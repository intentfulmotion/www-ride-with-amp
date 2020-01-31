// const path = require(`path`)

// exports.createPages = async ({ graphql, actions, reporter }) => {
//   const { createPage } = actions
//   const result = await graphql(`
//     query {
//       allContentfulProductCollection {
//         edges {
//           node {
//             name
//             description
//             slug
//             featuredImage {
//               fluid {
//                 ...GatsbyContentfulFluid_tracedSVG
//               }
//             }
//             products {
//               name
//               active
//               sku
//               price
//               description {
//                 description
//               }
//               shortDescription          
//               images {
//                 fluid {
//                   ...GatsbyContentfulFluid_tracedSVG
//                 }
//               }
//               length
//               width
//               depth
//               tags
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) {
//     reporter.panicOnBuild(`Error while running GraphQL query: ${JSON.stringify(result.errors, null, 2)}`)
//     return
//   }

//   const collectionTemplate = path.resolve(`src/templates/collection.js`)

//   result.data.allContentfulProductCollection.edges.forEach(({ node }) => {
//     createPage({
//       path: `/${node.slug}`,
//       component: collectionTemplate,
//       context: { node }
//     })
//   })
// }

const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions  
  const template = path.resolve('./src/templates/collection.js')
  const result = await graphql(
    `
      {
        allContentfulProductCollection {
          edges {
            node {
              name
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors)
    reporter.panicOnBuild(`Error while running GraphQL query: ${JSON.stringify(result.errors, null, 2)}`)

  const collections = result.data.allContentfulProductCollection.edges
  collections.forEach((collection, index) => {
    createPage({
      path: `/${collection.node.slug}/`,
      component: template,
      context: {
        slug: collection.node.slug
      },
    })
  })
}

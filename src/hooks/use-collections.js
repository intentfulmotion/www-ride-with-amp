import { useStaticQuery, graphql } from "gatsby"

export const useCollections = () => {
  const { allContentfulProductCollection: collections } = useStaticQuery(
    graphql`
      query Collections {
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

  return collections.edges.map(edge => edge.node)
}
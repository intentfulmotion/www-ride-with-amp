import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
            footer {
              section
              links {
                name
                link
              }
            }
          }
        }
      }
    `
  )
  
  return site.siteMetadata
}
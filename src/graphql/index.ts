import gql from 'graphql-tag'

const postsCategoriesQuery = gql`
  query {
    categories(where: { exclude: 11 }) {
      edges {
        node {
          categoryId
          name
        }
      }
    }
    posts(first: 10, after: "") {
      edges {
        node {
          id
          title
          date
          excerpt
          categories(where: { exclude: 11 }) {
            edges {
              node {
                name
                categoryId
              }
            }
          }
          featuredImage {
            guid
          }
          author {
            name
            avatar {
              url
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export { postsCategoriesQuery }

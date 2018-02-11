import gql from 'graphql-tag'
import { GraphPost, PageInfo } from '@types'

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

const postsQuery = gql`
  query($after: String!) {
    posts(first: 10, after: $after) {
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

const postsTransform = (data: {
  posts: {
    edges: Array<{ node: GraphPost }>
    pageInfo: PageInfo
  }
}) => ({
  pageInfo: data!.posts!.pageInfo,
  posts: data!.posts!.edges.map(a => ({
    ...a.node,
    categories: [...a.node.categories.edges.map(b => b.node)],
  })),
})

export { postsCategoriesQuery, postsQuery, postsTransform }

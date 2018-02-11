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
    featured: posts(first: 1, after: "") {
      edges {
        node {
          postId
          id
          title
          date
          excerpt
          categories(where: { include: [11] }) {
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
    }
    other: posts(first: 10, after: "") {
      edges {
        node {
          postId
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
          postId
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
  edges: Array<{ node: GraphPost }>
  pageInfo?: PageInfo
}) =>
  data!.edges.map((a: any) => ({
    ...a.node,
    categories: [...a.node.categories.edges.map((b: any) => b.node)],
  }))

export { postsCategoriesQuery, postsQuery, postsTransform }

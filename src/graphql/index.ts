import gql from 'graphql-tag'
import { GraphPost, PageInfo } from '@types'
import { featuredCategoryId } from '@config'

const postsCategoriesQuery = gql`
  query {
    categories(
      where: {
        exclude: ${featuredCategoryId}
        hideEmpty: true
        shouldOutputInFlatList: true
      }
      first: 20
    ) {
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
          categories(where: { include: [${featuredCategoryId}] }) {
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
          categories(
            where: { exclude: ${featuredCategoryId}, shouldOutputInFlatList: true }
          ) {
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
          categories(
            where: { exclude: ${featuredCategoryId}, shouldOutputInFlatList: true }
          ) {
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

const filteredPostsQuery = gql`
  query($after: String!, $categoryIn: [Int]!) {
    posts(first: 10, after: $after, where: { categoryIn: $categoryIn }) {
      edges {
        node {
          postId
          id
          title
          date
          excerpt
          categories(
            where: { exclude: ${featuredCategoryId}, shouldOutputInFlatList: true }
          ) {
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

const postQuery = gql`
  query($id: ID!) {
    post(id: $id) {
      content
      guid
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

export {
  postsCategoriesQuery,
  postsQuery,
  filteredPostsQuery,
  postsTransform,
  postQuery,
}

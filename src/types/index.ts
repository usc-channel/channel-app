export interface Category {
  categoryId: number
  name: string
}

export interface PostBase {
  postId: number
  id: string
  title: string
  date: string
  excerpt: string
  featuredImage: {
    guid: string
  }
  author: {
    name: string
    avatar: {
      url: string
    }
  }
}

export interface Post extends PostBase {
  categories: Category[]
}

export interface GraphPost extends PostBase {
  categories: {
    edges: Array<{
      node: Category
    }>
  }
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string
}

export interface Author {
  name: string
  avatar: {
    url: string
  }
}

export interface Store {
  network: {
    isConnected: boolean
    actionQueue: any[]
  }
}

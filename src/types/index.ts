import { AuthAction } from '@actions'
import { Dispatch as ReduxDispatch } from 'react-redux'

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

export interface Video {
  videoId: string
  publishedAt: string
  title: string
  thumbnail: string
}

export interface Release {
  title: string
  cover: string
  magazine: string
}

export interface Lecturer {
  id: string
  name: string
  totalReviews: number
  totalCourses: number
  averageRating: number
  School?: {
    name: string
  }
}

export interface Course {
  id: number
  code: string
  name: string
  reviews: number
}

export interface User {
  id: string
  name: string
  avatar: string
}

export interface Review {
  id: number
  semester: string
  year: number
  rating: number
  comment: string
  User: Partial<User>
  Course: Partial<Course>
}

export interface Store {
  network: {
    isConnected: boolean
    actionQueue: any[]
  }
  userState: UserState
}

export interface UserState {
  user: User | null
}

export type Dispatch = ReduxDispatch<AuthAction>

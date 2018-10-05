import { AuthAction } from '@actions'
import { Dispatch as ReduxDispatch, Omit } from 'react-redux'

export interface School {
  id: number
  name: string
}

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
  id: number
  name: string
  totalReviews: number
  totalCourses: number
  averageRating: number
  School: School
}

export interface Course {
  id: number
  code: string
  name: string
  reviews?: number
  totalReviews?: number
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
  comment?: string
  User: Partial<User>
  Course: Partial<Course>
}

export interface Store {
  network: {
    isConnected: boolean
    actionQueue: any[]
  }
  userState: UserState
  course: CourseState
  lecturer: LecturerState
  lecturerReviews: LecturerReviewsState
  lecturers: LecturersState
}

export interface UserState {
  user: User | null
}

export type CourseState = Omit<Course, 'reviews'> | null
export type LecturerState = Lecturer | null
export interface LecturerReviewsState {
  data: Review[]
  error: boolean
  loading: boolean | DataOperation
}
export interface LecturersState {
  data: Lecturer[]
  error: boolean
  loading: boolean | DataOperation
}

export type DataOperation = 'fetch' | 'refresh'

export type Dispatch = ReduxDispatch<AuthAction>

export interface PaginationInfo {
  resultsPerPage: number
  skip: number
  totalResults: number
  nextSkip?: number
}

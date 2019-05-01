import Axios from 'axios'
import { API_URL, AUTH, YOUTUBE_KEY as YOUTUBE } from 'react-native-dotenv'

export const featuredCategoryId = 11

export const API = (apiVersion: string = 'v1') =>
  Axios.create({
    baseURL: `${API_URL}/${apiVersion}`,
    auth: {
      username: 'admin',
      password: AUTH,
    },
  })

// Babel bug
export const YOUTUBE_KEY = YOUTUBE

import { Platform } from 'react-native'
import Axios from 'axios'
import env from '../../env'

export const featuredCategoryId = 11

const getAPI = () => {
  if (env.API_URL) {
    return env.API_URL
  }

  return Platform.OS === 'ios'
    ? 'http://localhost:8000'
    : 'http://10.0.2.2:8000'
}

const instance = Axios.create({
  baseURL: getAPI(),
  auth: {
    username: 'admin',
    password: env.AUTH,
  },
})

export const API = instance

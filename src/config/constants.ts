import { Platform } from 'react-native'

export const featuredCategoryId = 11

const getLocalAPI = () => {
  if (process.env.NODE_ENV === 'production') {
    return ''
  }

  return Platform.OS === 'ios'
    ? 'http://localhost:8000/api'
    : 'http://192.168.1.104:8000/api'
}

export const API = getLocalAPI()

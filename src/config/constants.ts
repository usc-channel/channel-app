import { Platform } from 'react-native'
import { API_URL } from 'react-native-dotenv'

export const featuredCategoryId = 11

const getAPI = () => {
  if (API_URL) {
    return API_URL
  }

  return Platform.OS === 'ios'
    ? 'http://localhost:8000/api'
    : 'http://192.168.1.104:8000/api'
}

export const API = getAPI()

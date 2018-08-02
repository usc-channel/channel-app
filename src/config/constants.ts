import { Platform } from 'react-native'
const env = require('../../env.js')

export const featuredCategoryId = 11

const getAPI = () => {
  if (env.API_URL) {
    return env.API_URL
  }

  return Platform.OS === 'ios'
    ? 'http://192.168.1.104:8000/api'
    : 'http://10.0.2.2:8000/api'
}

export const API = getAPI()

import { combineReducers } from 'redux'
import { reducer as network } from 'react-native-offline'
import userState from './user.reducer'
import { Store } from '@types'

export default combineReducers<Store>({
  userState,
  network,
} as any)

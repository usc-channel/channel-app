import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import rootReducer from '@reducers'
import { persistReducer, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userState'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer as any)

const store = createStore(persistedReducer as any, applyMiddleware(thunk))
persistStore(store)

export default store

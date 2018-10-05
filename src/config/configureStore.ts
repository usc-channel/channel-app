import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '@reducers'
import { persistReducer, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { Store as State } from 'types'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userState'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer as any)

const store = createStore(
  persistedReducer as any,
  window['__REDUX_DEVTOOLS_EXTENSION__'] &&
    window['__REDUX_DEVTOOLS_EXTENSION__'](),
  applyMiddleware(thunk)
) as Store<State>

persistStore(store)

export default store

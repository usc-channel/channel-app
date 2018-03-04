import { combineReducers, createStore } from 'redux'
import { reducer as network } from 'react-native-offline'

const rootReducer = combineReducers({
  // ... your other reducers here ...
  network,
})

const store = createStore(rootReducer)
export default store

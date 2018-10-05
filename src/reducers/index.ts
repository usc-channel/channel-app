import { combineReducers } from 'redux'
import { reducer as network } from 'react-native-offline'
import userState from './user.reducer'
import course from './course.reducer'
import lecturer from './lecturer.reducer'
import lecturerReviews from './lecturerReviews.reducer'
import { Store } from '@types'

export default combineReducers<Store>({
  userState,
  network,
  course,
  lecturer,
  lecturerReviews,
})

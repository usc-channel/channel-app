import * as actions from '@actions'
import { CourseState } from '@types'

const defaultState: CourseState = null

export default (
  state: CourseState = defaultState,
  action: actions.CourseAction
): CourseState => {
  switch (action.type) {
    case actions.SET_COURSE:
      return action.payload
    default:
      return state
  }
}

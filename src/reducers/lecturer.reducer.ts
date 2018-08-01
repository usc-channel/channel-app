import * as actions from '@actions'
import { LecturerState } from '@types'

const defaultState: LecturerState = null

export default (
  state: LecturerState = defaultState,
  action: actions.LecturerAction
): LecturerState => {
  switch (action.type) {
    case actions.SET_LECTURER:
      return action.payload
    default:
      return state
  }
}

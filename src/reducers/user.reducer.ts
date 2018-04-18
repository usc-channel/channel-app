import * as actions from '@actions'
import { UserState } from '@types'

const defaultState: UserState = {
  loading: false,
  user: null,
  error: null,
}

export default (
  state: UserState = defaultState,
  action: actions.UserAction
): UserState => {
  switch (action.type) {
    case actions.CREATE_USER_STARTED:
      return {
        loading: true,
        user: null,
        error: null,
      }
    case actions.CREATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: null,
      }
    case actions.CREATE_USER_FAILED:
      return {
        loading: false,
        user: null,
        error: action.payload,
      }
    default:
      return state
  }
}

import * as actions from '@actions'
import { UserState } from '@types'

const defaultState: UserState = {
  user: null,
}

export default (
  state: UserState = defaultState,
  action: actions.AuthAction
): UserState => {
  switch (action.type) {
    case actions.SIGNIN:
      return {
        user: action.payload,
      }
    case actions.SIGNOUT:
      return {
        user: null,
      }
    default:
      return state
  }
}

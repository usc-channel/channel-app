import * as actions from '@actions'
import { LecturersState } from '@types'

const defaultState: LecturersState = {
  data: [],
  loading: false,
  error: false,
}

export default (
  state: LecturersState = defaultState,
  action: actions.LecturersAction
): LecturersState => {
  switch (action.type) {
    case actions.GET_LECTURERS_START:
      return {
        ...state,
        loading: action.payload.operation,
      }
    case actions.GET_LECTURERS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case actions.GET_LECTURERS_DONE:
      return {
        data: action.payload.lecturers,
        error: false,
        loading: false,
      }
    default:
      return state
  }
}

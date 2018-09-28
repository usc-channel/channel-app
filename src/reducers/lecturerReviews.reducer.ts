import * as actions from '@actions'
import { LecturerReviewsState } from '@types'

const defaultState: LecturerReviewsState = {
  data: [],
  loading: false,
  error: false,
}

export default (
  state: LecturerReviewsState = defaultState,
  action: actions.LecturerReviewsAction
): LecturerReviewsState => {
  switch (action.type) {
    case actions.GET_LECTURER_REVIEWS_START:
      return {
        ...state,
        loading: action.payload.operation,
        error: false,
      }
    case actions.GET_LECTURER_REVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case actions.GET_LECTURER_REVIEWS_DONE:
      return {
        data: action.payload.reviews,
        error: false,
        loading: false,
      }
    default:
      return state
  }
}

import * as actions from '@actions'
import { LecturerReviewsState } from '@types'

const defaultState: LecturerReviewsState = {
  results: [],
  pageInfo: null,
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
        error: action.payload.operation === 'retry' ? true : false,
      }
    case actions.GET_LECTURER_REVIEWS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case actions.GET_LECTURER_REVIEWS_DONE:
      return {
        results: action.payload.results,
        pageInfo: action.payload.pageInfo,
        error: false,
        loading: false,
      }
    default:
      return state
  }
}

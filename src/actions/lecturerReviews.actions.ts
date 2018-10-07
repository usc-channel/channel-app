import * as actions from './actionTypes'
import { DataOperation, Dispatch, PaginationInfo, Review } from '@types'
import { API, Theme } from '@config'

const getLecturerReviewsStart = (
  operation: DataOperation
): GetLecturerReviewsStartAction => ({
  type: actions.GET_LECTURER_REVIEWS_START,
  payload: {
    operation,
  },
})

const getLecturerReviewsDone = (
  results: Review[],
  pageInfo: PaginationInfo
): GetLecturerReviewsDoneAction => ({
  type: actions.GET_LECTURER_REVIEWS_DONE,
  payload: {
    results,
    pageInfo,
  },
})

const getLecturerReviewsError = (): GetLecturerReviewsErrorAction => ({
  type: actions.GET_LECTURER_REVIEWS_ERROR,
})

export const getLecturerReviews = (
  lecturerId: number,
  operation: DataOperation = 'fetch'
) => {
  return async (dispatch: Dispatch) => {
    dispatch(getLecturerReviewsStart(operation))

    try {
      const {
        data: { results, pageInfo },
      } = await API().get(`/reviews?lecturerId=${lecturerId}`)

      if (operation === 'fetch') {
        dispatch(getLecturerReviewsDone(results, pageInfo))
      } else {
        setTimeout(() => {
          dispatch(getLecturerReviewsDone(results, pageInfo))
        }, Theme.refreshTimeout)
      }
    } catch {
      setTimeout(() => {
        dispatch(getLecturerReviewsError())
      }, Theme.refreshTimeout)
    }
  }
}

interface GetLecturerReviewsStartAction {
  type: typeof actions.GET_LECTURER_REVIEWS_START
  payload: {
    operation: DataOperation
  }
}

interface GetLecturerReviewsDoneAction {
  type: typeof actions.GET_LECTURER_REVIEWS_DONE
  payload: {
    results: Review[]
    pageInfo: PaginationInfo
  }
}

interface GetLecturerReviewsErrorAction {
  type: typeof actions.GET_LECTURER_REVIEWS_ERROR
}

export type LecturerReviewsAction = GetLecturerReviewsStartAction &
  GetLecturerReviewsDoneAction &
  GetLecturerReviewsErrorAction

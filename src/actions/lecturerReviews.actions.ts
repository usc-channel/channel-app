import * as actions from './actionTypes'
import { DataOperation, Dispatch, Review } from '@types'
import { API } from '@config'

const getLecturerReviewsStart = (
  operation: DataOperation
): GetLecturerReviewsStartAction => ({
  type: actions.GET_LECTURER_REVIEWS_START,
  payload: {
    operation,
  },
})

const getLecturerReviewsDone = (
  reviews: Review[]
): GetLecturerReviewsDoneAction => ({
  type: actions.GET_LECTURER_REVIEWS_DONE,
  payload: {
    reviews,
  },
})

const getLecturerReviewsError = (): GetLecturerReviewsErrorAction => ({
  type: actions.GET_LECTURER_REVIEWS_ERROR,
})

export const getLecturerReviews = (
  lecturerId: number,
  refresh: boolean = false
) => {
  return async (dispatch: Dispatch) => {
    dispatch(getLecturerReviewsStart(refresh ? 'refresh' : 'fetch'))

    try {
      const { data: reviews } = await API().get(
        `/reviews?lecturerId=${lecturerId}`
      )

      dispatch(getLecturerReviewsDone(reviews))
    } catch {
      dispatch(getLecturerReviewsError())
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
    reviews: Review[]
  }
}

interface GetLecturerReviewsErrorAction {
  type: typeof actions.GET_LECTURER_REVIEWS_ERROR
}

export type LecturerReviewsAction = GetLecturerReviewsStartAction &
  GetLecturerReviewsDoneAction &
  GetLecturerReviewsErrorAction

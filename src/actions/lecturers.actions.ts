import * as actions from './actionTypes'
import { DataOperation, Dispatch, Lecturer } from '@types'
import { API, Theme } from '@config'

const getLecturersStart = (
  operation: DataOperation
): GetLecturersStartAction => ({
  type: actions.GET_LECTURERS_START,
  payload: {
    operation,
  },
})

const getLecturersDone = (lecturers: Lecturer[]): GetLecturersDoneAction => ({
  type: actions.GET_LECTURERS_DONE,
  payload: {
    lecturers,
  },
})

const getLecturersError = (): GetLecturersErrorAction => ({
  type: actions.GET_LECTURERS_ERROR,
})

export const getLecturers = (refresh: boolean = false) => {
  return async (dispatch: Dispatch) => {
    dispatch(getLecturersStart(refresh ? 'refresh' : 'fetch'))

    try {
      const { data } = await API().get(`/lecturers`)

      setTimeout(() => {
        dispatch(getLecturersDone(data))
      }, Theme.refreshTimeout)
    } catch {
      setTimeout(() => {
        dispatch(getLecturersError())
      }, Theme.refreshTimeout)
    }
  }
}

interface GetLecturersStartAction {
  type: typeof actions.GET_LECTURERS_START
  payload: {
    operation: DataOperation
  }
}

interface GetLecturersDoneAction {
  type: typeof actions.GET_LECTURERS_DONE
  payload: {
    lecturers: Lecturer[]
  }
}

interface GetLecturersErrorAction {
  type: typeof actions.GET_LECTURERS_ERROR
}

export type LecturersAction = GetLecturersStartAction &
  GetLecturersDoneAction &
  GetLecturersErrorAction

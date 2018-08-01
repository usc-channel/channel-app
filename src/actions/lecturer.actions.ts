import { SET_LECTURER } from './actionTypes'
import { LecturerState } from '@types'
import { Action } from 'redux'

type SetLecturerAction = Action & {
  payload: LecturerState
}

type LecturerAction = SetLecturerAction

const setLecturer = (lecturer: LecturerState): LecturerAction => ({
  type: SET_LECTURER,
  payload: lecturer,
})

export { setLecturer, LecturerAction }

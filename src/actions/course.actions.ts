import { SET_COURSE } from './actionTypes'
import { CourseState } from '@types'
import { Action } from 'redux'

type SetCourseAction = Action & {
  payload: CourseState
}

type CourseAction = SetCourseAction

const setCourse = (course: CourseState): CourseAction => ({
  type: SET_COURSE,
  payload: course,
})

export { setCourse, CourseAction }

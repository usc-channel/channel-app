import {
  CREATE_USER_FAILED,
  CREATE_USER_STARTED,
  CREATE_USER_SUCCESS,
} from './actionTypes'
import { Dispatch, User } from '@types'
import { API } from '@config'
import { Action } from 'redux'

type CreateUserStartedAction = Action

type CreateUserSuccessAction = Action & {
  payload: User
}

type CreateUserFailedAction = Action & {
  payload: string
}

type UserAction = CreateUserStartedAction &
  CreateUserSuccessAction &
  CreateUserFailedAction

const createUserStarted = (): CreateUserStartedAction => ({
  type: CREATE_USER_STARTED,
})

const createUserSuccess = (user: User): CreateUserSuccessAction => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
})

const createUserFailed = (message: string): CreateUserFailedAction => ({
  type: CREATE_USER_FAILED,
  payload: message,
})

const createUser = (
  name: string,
  email: string,
  password: string,
  avatar: string
) => {
  return async (dispatch: Dispatch) => {
    dispatch(createUserStarted())

    try {
      const request = await fetch(`${API}/users`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password, avatar }),
      })

      const response = await request.json()

      if (response.id) {
        dispatch(createUserSuccess(response))
      } else {
        dispatch(createUserFailed('Error creating account.'))
      }
    } catch (e) {
      dispatch(createUserFailed('Problem reaching server.'))
      throw new Error(e)
    }
  }
}

export { createUser, UserAction }

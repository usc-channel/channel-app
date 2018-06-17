import { SIGNIN, SIGNOUT } from './actionTypes'
import { User } from '@types'
import { Action } from 'redux'

type SignInAction = Action & {
  payload: User
}

type SignOutAction = Action

type AuthAction = SignInAction & SignOutAction

const signIn = (user: User): SignInAction => ({
  type: SIGNIN,
  payload: user,
})

const signOut = (): SignOutAction => ({
  type: SIGNOUT,
})

export { signIn, signOut, AuthAction }

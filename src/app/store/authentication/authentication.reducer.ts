import { createReducer, on } from '@ngrx/store'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './authentication.actions'
import type { User } from './auth.model'

export type AuthenticationState = {
  isLoggedIn: boolean
  user: User | null
  error: string | null
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: null,
  error: null,
}

import { createReducer, on } from '@ngrx/store'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from './authentication.actions'
import type { User } from './auth.model'

export type AuthenticationState = {
  isLoggedIn: boolean
  loading: boolean
  user: User | null
  error: string | null
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  loading: false,
  user: null,
  error: null,
}

export const authenticationReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    loading: false,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    loading: false,
    error,
  })),
  on(logout, (state) => ({ ...state, loading: false })),
  on(logoutSuccess, () => ({ ...initialState }))
)

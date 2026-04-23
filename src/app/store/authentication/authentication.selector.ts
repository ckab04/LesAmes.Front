import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthenticationState } from './authentication.reducer'

export const getUserState =
  createFeatureSelector<AuthenticationState>('authentication')

export const getUser = createSelector(
  getUserState,
  (state: AuthenticationState) => state.user
)

export const getisLoggedIn = createSelector(
  getUserState,
  (state: AuthenticationState) => state.isLoggedIn
)

export const getLoading = createSelector(
  getUserState,
  (state: AuthenticationState) => state.loading
)

export const getError = createSelector(
  getUserState,
  (state: AuthenticationState) => state.error
)

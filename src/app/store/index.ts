import { layoutReducer, LayoutState } from './layout/layout-reducers'
import {
  authenticationReducer,
  AuthenticationState
} from './authentication/authentication.reducer'
import {
  calendarReducer,
  type CalendarState,
} from './calendar/calendar.reducer'
import { ActionReducerMap } from '@ngrx/store'


export interface RootReducerState {
  layout: LayoutState
  authentication: AuthenticationState
  Calendar: CalendarState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  authentication: authenticationReducer,
  Calendar: calendarReducer,
}
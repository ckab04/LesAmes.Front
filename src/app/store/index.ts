import { LayoutState } from './layout/layout-reducers'
import {
  AuthenticationState
} from './authentication/authentication.reducer'
import {
  calendarReducer,
  type CalendarState,
} from './calendar/calendar.reducer'


export interface RootReducerState {
  layout: LayoutState
  authentication: AuthenticationState
  Calendar: CalendarState
}
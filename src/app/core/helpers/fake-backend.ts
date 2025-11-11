import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators'

export type User = {
  firstName?: string
  lastName?: string
  name?: string
}

type MyRequestBody = {
  // Define the structure of your request body
  username: string
  name: string
  password: string
  email: string
}

let Token: string =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0ZWNoemFhIiwiYXVkIjoiaHR0cHM6Ly90ZWNoemFhLmdldGFwcHVpLmNvbS8iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVjaHphYSIsIkVtYWlsIjoidGVjaHphYXN0dWRpb0BnbWFpbC5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJUZXN0VG9rZW4ifQ.ud4LnFZ-mqhHEYiPf2wCLM7KvLGoAxhXTBSymRIZEFLleFkO119AXd8p3OfPCpdUWSyeZl8-pZyElANc_KHj5w'
/**
 * @returns registered user list
 */
function getUsers(): User[] {
  let users: User[] = JSON.parse(sessionStorage.getItem('users')!) || [
    {
      id: 1,
      username: 'user',
      email: 'user@demo.com',
      password: '123456',
      firstName: 'user',
      lastName: 'demo',
      avatar: 'assets/images/users/user-1.jpg',
      location: 'California, USA',
      title: 'Admin Head',
      token: Token,
    },
  ]
  return users
}
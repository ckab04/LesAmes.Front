import { inject, Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, tap } from 'rxjs/operators'
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from './authentication.actions'
import { AuthenticationService } from '@/app/core/service/auth.service'
import { User } from './auth.model'

@Injectable()
export class AuthenticationEffects {
  private actions$ = inject(Actions)

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.authenticationService.login(email, password).pipe(
          map((user: User) => {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/dashboard/analytics'
            this.router.navigateByUrl(returnUrl)
            return loginSuccess({ user })
          }),
          catchError((error) =>
            of(loginFailure({ error: this.toMessage(error) }))
          )
        )
      )
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        this.authenticationService.logout()
        this.router.navigate(['/auth/log-in'])
      }),
      map(() => logoutSuccess())
    )
  )

  private toMessage(error: unknown): string {
    if (typeof error === 'string') return error
    if (error && typeof error === 'object') {
      const anyErr = error as { message?: string; status?: number }
      if (anyErr.status === 401) return 'Email ou mot de passe invalide.'
      if (anyErr.message) return anyErr.message
    }
    return 'Connexion impossible. Veuillez réessayer.'
  }
}

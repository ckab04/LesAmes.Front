import { inject, Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { exhaustMap } from 'rxjs/operators'
import {
  logout,
  logoutSuccess,
} from './authentication.actions'
import { AuthenticationService } from '@/app/core/service/auth.service'

@Injectable()
export class AuthenticationEffects {


  private actions$ = inject(Actions)

  constructor(
    private AuthenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => {
        this.AuthenticationService.logout()
        this.router.navigate(['/auth/log-in'])
        return of(logoutSuccess())
      })
    )
  )

}

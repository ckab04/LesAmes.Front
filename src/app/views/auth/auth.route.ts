import { Route } from '@angular/router'
import { LockScreenComponent } from './lock-screen/lock-screen.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { RegisterTuteurComponent } from './register-tuteur/register-tuteur.component'
import { RegisterAmeComponent } from './register-ame/register-ame.component'
import { RecoverPwComponent } from './recover-pw/recover-pw.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'log-in',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'register-tuteur',
    component: RegisterTuteurComponent,
    data: { title: 'Inscription Tuteur' },
  },
  {
    path: 'register-ame',
    component: RegisterAmeComponent,
    data: { title: 'Inscription Âme' },
  },
  {
    path: 'reset-pass',
    component: RecoverPwComponent,
    data: { title: 'Recover Password' },
  },
  {
    path: 'lock-screen',
    component: LockScreenComponent,
    data: { title: 'Lock Screen' },
  },
]

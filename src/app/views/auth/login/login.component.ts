import { login } from '@/app/store/authentication/authentication.actions'
import {
  getError,
  getLoading,
} from '@/app/store/authentication/authentication.selector'
import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup
  loading = false
  errorMessage: string | null = null
  submitted = false

  private fb = inject(UntypedFormBuilder)
  private store = inject(Store)

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.store
      .select(getLoading)
      .pipe(takeUntilDestroyed())
      .subscribe((loading) => (this.loading = loading))

    this.store
      .select(getError)
      .pipe(takeUntilDestroyed())
      .subscribe((error) => (this.errorMessage = error))
  }

  get formValues() {
    return this.signInForm.controls
  }

  login() {
    this.submitted = true
    if (this.signInForm.invalid) return

    const email = this.formValues['email'].value
    const password = this.formValues['password'].value

    this.store.dispatch(login({ email, password }))
  }
}

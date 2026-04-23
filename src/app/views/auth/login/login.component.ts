import { login } from "@/app/store/authentication/authentication.actions";
import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  RouterLink,
  Router,
  NavigationCancel,
  NavigationError,
} from "@angular/router";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styles: ``,
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup;
  loading = false;
  hasWrongCredentials = false;
  submitted = false;

  public fb = inject(UntypedFormBuilder);
  public store = inject(Store);

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ["ton mail ici !", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  get formValues() {
    return this.signInForm.controls;
  }

  login() {
    //this.submitted = true;

    if (this.signInForm.valid) {
      const email = this.formValues["email"].value;
      const password = this.formValues["password"].value;

      console.log("email = ", email);
      console.log("Password = ", password);

      // Login Api
      this.store.dispatch(login({ email: email, password: password }));
      this.route.navigate(["/starter"]);
    }

    //console.log("Logging IN");
  }
}

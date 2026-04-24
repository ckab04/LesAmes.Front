import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { getisLoggedIn } from '@/app/store/authentication/authentication.selector'

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  private store = inject(Store)
  private router = inject(Router)

  readonly currentYear = new Date().getFullYear()
  readonly isLoggedIn$: Observable<boolean> = this.store.select(getisLoggedIn)

  goToDashboard(): void {
    this.router.navigateByUrl('/dashboard/analytics')
  }
}

import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { WebApiService } from '@/app/core/service/web-api-service.service'
import { AgeRangeDto, TutorDto } from '@/app/api/client'

@Component({
  selector: 'app-register-tuteur',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register-tuteur.component.html',
})
export class RegisterTuteurComponent implements OnInit {
  private fb = inject(FormBuilder)
  private api = inject(WebApiService)
  private router = inject(Router)

  form!: FormGroup
  ageRanges: AgeRangeDto[] = []
  submitted = false
  loading = false
  errorMessage: string | null = null

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      ageRangeId: ['', [Validators.required]],
      menteeAgeRangesIds: [[]],
    })

    this.loadAgeRanges()
  }

  private loadAgeRanges(): void {
    this.api.getService().ageRangesGET().subscribe({
      next: (response) => {
        this.ageRanges = (response.ageRanges ?? []).filter((r) => r.isActive)
      },
      error: () => {
        this.errorMessage =
          "Impossible de charger les tranches d'âge. Veuillez réessayer."
      },
    })
  }

  get controls() {
    return this.form.controls
  }

  onMenteeAgeRangeToggle(id: string, checked: boolean): void {
    const current = (this.form.value.menteeAgeRangesIds as string[]) ?? []
    const next = checked
      ? Array.from(new Set([...current, id]))
      : current.filter((x) => x !== id)
    this.form.patchValue({ menteeAgeRangesIds: next })
  }

  formatRange(range: AgeRangeDto): string {
    return `${range.ageMin ?? '?'} - ${range.ageMax ?? '?'} ans`
  }

  onSubmit(): void {
    this.submitted = true
    this.errorMessage = null

    if (this.form.invalid) return

    this.loading = true
    const dto = TutorDto.fromJS({
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      ageRangeId: this.form.value.ageRangeId,
      menteeAgeRangesIds: this.form.value.menteeAgeRangesIds ?? [],
      hobbiesIds: [],
    })

    this.api.getService().register(dto).subscribe({
      next: () => {
        this.loading = false
        this.router.navigate(['/auth/log-in'])
      },
      error: (error) => {
        this.loading = false
        this.errorMessage =
          error?.message ??
          "Inscription impossible. Veuillez vérifier les informations et réessayer."
      },
    })
  }
}

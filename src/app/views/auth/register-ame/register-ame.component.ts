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
import { AgeRangeDto, SexeDto, SoulDto } from '@/app/api/client'

@Component({
  selector: 'app-register-ame',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register-ame.component.html',
})
export class RegisterAmeComponent implements OnInit {
  private fb = inject(FormBuilder)
  private api = inject(WebApiService)
  private router = inject(Router)

  form!: FormGroup
  ageRanges: AgeRangeDto[] = []
  submitted = false
  loading = false
  errorMessage: string | null = null

  readonly sexeOptions = [
    { value: SexeDto._1, label: 'Masculin' },
    { value: SexeDto._2, label: 'Féminin' },
    { value: SexeDto._3, label: 'Autre' },
  ]

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      sexe: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      quartier: ['', [Validators.required]],
      ageRangeId: ['', [Validators.required]],
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

  formatRange(range: AgeRangeDto): string {
    return `${range.ageMin ?? '?'} - ${range.ageMax ?? '?'} ans`
  }

  onSubmit(): void {
    this.submitted = true
    this.errorMessage = null

    if (this.form.invalid) return

    this.loading = true
    const dto = SoulDto.fromJS({
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      sexe: Number(this.form.value.sexe),
      telephone: this.form.value.telephone,
      email: this.form.value.email || undefined,
      quartier: this.form.value.quartier,
      ageRangeId: this.form.value.ageRangeId,
      dateCreation: new Date().toISOString(),
      hobbiesIds: [],
    })

    this.api.getService().soulsPOST(dto).subscribe({
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

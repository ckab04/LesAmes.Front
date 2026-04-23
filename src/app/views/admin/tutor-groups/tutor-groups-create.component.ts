import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TutorGroupsService } from './tutor-groups.service'
import { TutorGroup } from './tutor-group.model'

@Component({
  selector: 'app-tutor-groups-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tutor-groups-create.component.html',
})
export class TutorGroupsCreateComponent implements OnInit {
  private fb = inject(FormBuilder)
  private groupsService = inject(TutorGroupsService)

  form!: FormGroup
  groups: TutorGroup[] = []
  submitted = false
  loading = false
  errorMessage: string | null = null
  successMessage: string | null = null

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    })
    this.loadGroups()
  }

  get controls() {
    return this.form.controls
  }

  loadGroups(): void {
    this.groupsService.list().subscribe({
      next: (groups) => (this.groups = groups ?? []),
      error: () => {
        this.groups = []
      },
    })
  }

  onSubmit(): void {
    this.submitted = true
    this.errorMessage = null
    this.successMessage = null

    if (this.form.invalid) return

    this.loading = true
    const payload: TutorGroup = {
      name: this.form.value.name,
      description: this.form.value.description || undefined,
    }

    this.groupsService.create(payload).subscribe({
      next: () => {
        this.loading = false
        this.successMessage = 'Groupe créé avec succès.'
        this.submitted = false
        this.form.reset()
        this.loadGroups()
      },
      error: (error) => {
        this.loading = false
        this.errorMessage =
          error?.message ?? 'Création impossible. Veuillez réessayer.'
      },
    })
  }

  deleteGroup(id?: string): void {
    if (!id) return
    if (!confirm('Supprimer ce groupe ?')) return
    this.groupsService.delete(id).subscribe({
      next: () => this.loadGroups(),
      error: (error) => {
        this.errorMessage =
          error?.message ?? 'Suppression impossible. Veuillez réessayer.'
      },
    })
  }
}

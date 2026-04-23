import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TutorGroupsService } from './tutor-groups.service'
import { TutorGroup, TutorSummary } from './tutor-group.model'

@Component({
  selector: 'app-tutor-group-tutors',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tutor-group-tutors.component.html',
})
export class TutorGroupTutorsComponent implements OnInit {
  private groupsService = inject(TutorGroupsService)

  groups: TutorGroup[] = []
  tutors: TutorSummary[] = []
  selectedGroupId = new FormControl<string>('', { nonNullable: true })
  loading = false
  errorMessage: string | null = null

  ngOnInit(): void {
    this.loadGroups()
    this.selectedGroupId.valueChanges.subscribe((id) => {
      if (id) this.loadTutors(id)
      else this.tutors = []
    })
  }

  private loadGroups(): void {
    this.groupsService.list().subscribe({
      next: (groups) => (this.groups = groups ?? []),
      error: () => {
        this.errorMessage =
          'Impossible de charger la liste des groupes. Veuillez réessayer.'
      },
    })
  }

  private loadTutors(groupId: string): void {
    this.loading = true
    this.errorMessage = null
    this.groupsService.listTutors(groupId).subscribe({
      next: (tutors) => {
        this.tutors = tutors ?? []
        this.loading = false
      },
      error: (error) => {
        this.tutors = []
        this.loading = false
        this.errorMessage =
          error?.message ?? 'Impossible de charger les tuteurs de ce groupe.'
      },
    })
  }

  fullName(t: TutorSummary): string {
    return `${t.firstName ?? ''} ${t.lastName ?? ''}`.trim() || '—'
  }
}

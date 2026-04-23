import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { forkJoin } from 'rxjs'
import { SoulsService } from './souls.service'
import { Soul } from './soul.model'
import { TutorGroupsService } from '../tutor-groups/tutor-groups.service'
import { TutorGroup } from '../tutor-groups/tutor-group.model'

@Component({
  selector: 'app-soul-assignments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './soul-assignments.component.html',
})
export class SoulAssignmentsComponent implements OnInit {
  private soulsService = inject(SoulsService)
  private groupsService = inject(TutorGroupsService)

  groups: TutorGroup[] = []
  allSouls: Soul[] = []
  groupSouls: Soul[] = []

  selectedGroupId = new FormControl<string>('', { nonNullable: true })
  loadingLists = false
  busyIds = new Set<string>()
  errorMessage: string | null = null

  ngOnInit(): void {
    this.groupsService.list().subscribe({
      next: (groups) => (this.groups = groups ?? []),
      error: () => {
        this.errorMessage =
          'Impossible de charger la liste des groupes. Veuillez réessayer.'
      },
    })

    this.selectedGroupId.valueChanges.subscribe((id) => {
      if (id) this.loadLists(id)
      else {
        this.allSouls = []
        this.groupSouls = []
      }
    })
  }

  get availableSouls(): Soul[] {
    const inGroup = new Set(this.groupSouls.map((s) => s.id))
    return this.allSouls.filter((s) => s.id && !inGroup.has(s.id))
  }

  fullName(s: Soul): string {
    return `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim() || '—'
  }

  isBusy(soulId?: string): boolean {
    return !!soulId && this.busyIds.has(soulId)
  }

  private loadLists(groupId: string): void {
    this.loadingLists = true
    this.errorMessage = null
    forkJoin({
      all: this.soulsService.list(),
      inGroup: this.groupsService.listSouls(groupId),
    }).subscribe({
      next: ({ all, inGroup }) => {
        this.allSouls = all ?? []
        this.groupSouls = inGroup ?? []
        this.loadingLists = false
      },
      error: (error) => {
        this.allSouls = []
        this.groupSouls = []
        this.loadingLists = false
        this.errorMessage =
          error?.message ?? 'Impossible de charger les âmes.'
      },
    })
  }

  assign(soul: Soul): void {
    const groupId = this.selectedGroupId.value
    if (!groupId || !soul.id) return
    this.busyIds.add(soul.id)
    this.groupsService.assignSoul(groupId, soul.id).subscribe({
      next: () => {
        this.busyIds.delete(soul.id!)
        this.groupSouls = [...this.groupSouls, soul]
      },
      error: (error) => {
        this.busyIds.delete(soul.id!)
        this.errorMessage =
          error?.message ?? "Affectation impossible. Veuillez réessayer."
      },
    })
  }

  remove(soul: Soul): void {
    const groupId = this.selectedGroupId.value
    if (!groupId || !soul.id) return
    this.busyIds.add(soul.id)
    this.groupsService.removeSoul(groupId, soul.id).subscribe({
      next: () => {
        this.busyIds.delete(soul.id!)
        this.groupSouls = this.groupSouls.filter((s) => s.id !== soul.id)
      },
      error: (error) => {
        this.busyIds.delete(soul.id!)
        this.errorMessage =
          error?.message ?? 'Retrait impossible. Veuillez réessayer.'
      },
    })
  }
}

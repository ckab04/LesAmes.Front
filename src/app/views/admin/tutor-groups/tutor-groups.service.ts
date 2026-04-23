import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '@/environments/environment'
import { TutorGroup, TutorSummary } from './tutor-group.model'
import { Soul } from '../soul-assignments/soul.model'

@Injectable({ providedIn: 'root' })
export class TutorGroupsService {
  private http = inject(HttpClient)
  private baseUrl = `${environment.apiUrl}/tutor-groups`

  list(): Observable<TutorGroup[]> {
    return this.http.get<TutorGroup[]>(this.baseUrl)
  }

  get(id: string): Observable<TutorGroup> {
    return this.http.get<TutorGroup>(`${this.baseUrl}/${id}`)
  }

  create(group: TutorGroup): Observable<TutorGroup> {
    return this.http.post<TutorGroup>(this.baseUrl, group)
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

  listTutors(groupId: string): Observable<TutorSummary[]> {
    return this.http.get<TutorSummary[]>(`${this.baseUrl}/${groupId}/tutors`)
  }

  listSouls(groupId: string): Observable<Soul[]> {
    return this.http.get<Soul[]>(`${this.baseUrl}/${groupId}/souls`)
  }

  assignSoul(groupId: string, soulId: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${groupId}/souls/${soulId}`,
      {}
    )
  }

  removeSoul(groupId: string, soulId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${groupId}/souls/${soulId}`
    )
  }
}

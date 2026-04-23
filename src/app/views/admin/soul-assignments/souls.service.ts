import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '@/environments/environment'
import { Soul } from './soul.model'

@Injectable({ providedIn: 'root' })
export class SoulsService {
  private http = inject(HttpClient)
  private baseUrl = `${environment.apiUrl}/souls`

  list(): Observable<Soul[]> {
    return this.http.get<Soul[]>(this.baseUrl)
  }
}

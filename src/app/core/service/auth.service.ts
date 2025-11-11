import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { WebApiService } from './web-api-service.service'
import { AuthenticatedUserInfoDtoTask, TokenResponseDtoTask } from '@/app/api/client'
import { User } from '../helpers/fake-backend'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private accessKey = 'access_token';
  private refreshKey = 'refresh_token';
  private rolesKey = 'roles';

  private webApiService = inject(WebApiService)

  constructor(private http: HttpClient) {}

  get token(): string | null { return localStorage.getItem(this.accessKey); }
  get refreshToken(): string | null { return localStorage.getItem(this.refreshKey); }
  get roles(): string[] {
    const raw = localStorage.getItem(this.rolesKey);
    return raw ? JSON.parse(raw) : [];
  }

  setSession(access: string, refresh: string, roles: string[]): void {
    localStorage.setItem(this.accessKey, access);
    localStorage.setItem(this.refreshKey, refresh);
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  clear(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
    localStorage.removeItem(this.rolesKey);
  }

  isLoggedIn(): boolean {
    const t = this.token;
    if (!t) return false;
    // Optionnel: vérifier l’expiration (décode JWT et compare exp)
    try {
      const payload = JSON.parse(atob(t.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp ? payload.exp > now : true;
    } catch { return true; }
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  login(email: string, password: string) {
    return this.webApiService.getService().login(email, password).pipe(
      map((response: AuthenticatedUserInfoDtoTask) => {
        // login successful if there's a jwt token in the response
        if (response.result && response.result?.tokensInfo?.accessToken) {
          // store user details and jwt in session
          this.setSession(response.result?.tokensInfo.accessToken, response.result?.tokensInfo.refreshToken ?? '', response.result?.tokensInfo.roles ?? []);
        }
        return { firstName: response.result?.firstName, lastName: response.result?.lastName, name: `${response.result?.firstName} ${response.result?.lastName}`  } as User;
      })
    )
  }

  logout(): void {
    // remove user from cookie to log user out
    this.clear()
  }
}

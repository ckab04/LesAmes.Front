import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../core/service/auth.service';
import { environment } from '../environments/environment';
import { WebApiService } from '../core/service/web-api-service.service';
import { RefreshTokenDto, TokenResponseDto, TokenResponseDtoTask } from '../api/client';
import { throwError, switchMap, catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

    const auth = inject(AuthenticationService);
    const webApiService = inject(WebApiService);
    const isApi = req.url.startsWith('http') ? req.url.startsWith(environment.apiUrl) : true;

    let cloned = req;
    if (isApi && auth.token) {
        cloned = req.clone({
            setHeaders: { Authorization: `Bearer ${auth.token}` }
        });
    }

    return next(cloned).pipe(
        catchError((err: HttpErrorResponse) => {
            // Si 401 et on a un refresh token => tente un refresh
            if ((err.status === 401 || err.status === 404) && auth.refreshToken) {
                // Call ton endpoint de refresh (ex: POST /auth/refresh)
                // Ici, on utilise fetch pour éviter la récursion de l’interceptor
                return webApiService.getService().refreshToken({ refreshToken: auth.refreshToken } as RefreshTokenDto).pipe(
                    switchMap((data: TokenResponseDtoTask) => {
                        auth.setSession(data.result?.accessToken ?? '', data.result?.refreshToken ?? auth.refreshToken ?? '', data.result?.roles ?? []);
                        const retried = cloned.clone({
                            setHeaders: { Authorization: `Bearer ${auth.token}` }
                        });
                        return next(retried);
                    }),
                    catchError((error) => {
                        console.error('There was an error!', error);
                        auth.clear();
                        return throwError(() => error);
                    })
                );
            }
            return throwError(() => err);
        })
    );
};

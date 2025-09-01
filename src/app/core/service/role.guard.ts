import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthenticationService);
  const router = inject(Router);
  const roles = route.data['roles'] as string[] | undefined;
  if (!roles || roles.length === 0) return true;
  if (roles.some(r => auth.hasRole(r))) return true;
  router.navigate(['/not-found']);
  return false;
};

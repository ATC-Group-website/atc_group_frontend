import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const adminToken = localStorage.getItem('token');

  if (adminToken) {
    return true;
  } else {
    router.navigateByUrl('/admin/login');
    return false;
  }
};

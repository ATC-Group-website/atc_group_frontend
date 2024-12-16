import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const adminTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const ADMIN_ROUTES = ['/admin/logout', '/post'];
  const platformId = inject(PLATFORM_ID);

  if (ADMIN_ROUTES.some((route) => req.url.includes(route))) {
    // Retrieve the admin token from local storage
    // Only access localStorage in the browser
    let adminToken: string | null = null;

    if (isPlatformBrowser(platformId)) {
      adminToken = localStorage.getItem('token');
    }

    if (adminToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      // console.log(authReq);

      return next(authReq);
    }
  }

  // console.log(req);

  return next(req);
};

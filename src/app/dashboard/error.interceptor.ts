import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Handle unauthorized error
        localStorage.removeItem('token'); // Clear token
        router.navigate(['/admin/login']); // Redirect to login page
      }
      return throwError(() => error); // Re-throw the error for further handling
    }),
  );
};

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const responseErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      if (error.status === 401) {
        // Handle Unauthorized
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Handle Forbidden
        alert('You do not have permission to access this resource.');
      } else if (error.status === 500) {
        // Handle Server Error
        alert('A server error occurred. Please try again later.');
      }

      return throwError(() => error);
    })
  );
};

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add the authorization token to the request
    const authToken = this.authService.getAccessToken();
    let authReq = req;
    
    if (authToken && !req.url.includes('auth')) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('auth')) {
          // If it's a 401 error, attempt to refresh the token
            return this.handle401Error(req, next);
        }
        return throwError(error); // If it's not a 401 error, just throw it
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Try to refresh the token
    const refreshToken = this.authService.getRefreshToken(); // Get the refresh token

    if (!refreshToken) {
      // If no refresh token is available, we can't refresh the access token
      return throwError('No refresh token available');
    }

    // Call the AuthService method to refresh the access token
    return from(this.authService.refreshAccessToken()).pipe(
      switchMap((login: ApiResponse<LoginResponse>) => {
        this.authService.setLoginData(login.data);
        // If token refresh was successful, retry the original request
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${login.data.accessToken}`,
          },
        });
        return next.handle(authReq);
      }),
      catchError((err) => {
        this.authService.clearSession();
        // If the refresh fails, handle the error (maybe log out or show an error)
        return throwError('Token refresh failed');
      })
    );
  }
}
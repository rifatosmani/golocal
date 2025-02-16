import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService:AuthService,
    private apiService:ApiService
  ) { }

  getCurrentUser():any{
  this.apiService.getData('api/user/me')
    .subscribe((user: any) => {
      console.log(user);
    });  }
}

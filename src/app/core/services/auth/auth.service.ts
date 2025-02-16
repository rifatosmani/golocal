import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ApiResponse } from 'src/app/models/api-response.model';
import { LoginResponse,Role,User } from 'src/app/models/login-response.model';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginData!: LoginResponse | null;

  constructor(private apiService: ApiService,private router:Router) { }

  public login(username: string, password: string):Observable<LoginResponse> {
    return this.apiService.postData('auth/login', {
      "email": username,
      "password": password
    }).pipe(map((res:ApiResponse<LoginResponse>)=>res.data));
  }

  public refreshAccessToken():Observable<ApiResponse<LoginResponse>> {
    return this.apiService.postData('auth/refresh', {
      "refreshToken": this.getRefreshToken(),
    });
    /*.subscribe((res: ApiResponse<LoginResponse>) => {
      if (res.data) {
        this.loginData = res.data;
        localStorage.setItem('loginData', JSON.stringify(res.data));
      }
    });*/
  }

  public getLoginData(): LoginResponse|null {
    if (this.loginData == null) {
      let data = localStorage.getItem('loginData');
      if (data) {
        let dataLR: LoginResponse = JSON.parse(data);
        this.loginData = dataLR;
      }
    }
    return this.loginData;
  }

  public setLoginData(loginData:LoginResponse) {
    this.loginData =loginData;
    localStorage.setItem('loginData', JSON.stringify(loginData));
  }

 
  public getAccessToken(): string | null{
    let ld: LoginResponse |null= this.getLoginData();
    if (ld) {
      return ld.accessToken;
    } else {
      return null;
    }
  }

  public getRefreshToken(): string | null{
    let ld: LoginResponse|null = this.getLoginData();
    if (ld) {
      return ld.refreshToken;
    } else {
      return null;
    }
  }

  public getUser(): User | null {
    let ld: LoginResponse|null = this.getLoginData();
    if (ld) {
      return ld.user;
    } else {
      return null;
    }
  }

  public getUserRole(): Role | undefined {
    let role: Role | undefined = this.getUser()?.role;
    return role;
  } 
  public checkSession(){
    if(this.getLoginData()){
        this.router.navigate(['home']);
    }else{
      this.router.navigate(['login']);
    }
  }
  public clearSession() {
    this.loginData =null;
    localStorage.removeItem('loginData');
    this.router.navigate(['login']);
  }

}

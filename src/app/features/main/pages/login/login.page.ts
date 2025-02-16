import { Component } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoginResponse } from 'src/app/models/login-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class LoginPage {
  loginForm!: FormGroup;

  loading: boolean = false;

  constructor(
    private authService:AuthService,
    private router: Router,
    private formBuilder:FormBuilder,
  ) {}

  ionViewWillEnter() {
    console.log('LoginPage is about to enter view');
  }
  ngOnInit() {
    if(this.authService.getLoginData()){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['login']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {
  console.log(this.loginForm);
  this.authService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe((res:LoginResponse)=>{
    this.authService.setLoginData(res);
    this.router.navigate(['home']);

  })
  //this.router.navigate(['users']);
/*
    console.log(this.username)
    this.loading = true;

  // Simulate a login process
  this.apiService.postData('auth/login', {
    "email": this.username,
    "password": this.password
  }).subscribe((res: any) => {
    this.loading = false;
    if (res.data.user) {
      console.log(res);
      console.log('Login successful');
      this.errorMessage = '';

      // Save user data to localStorage
      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken',res.data.accessToken);
      // Navigate to the users page
      this.router.navigate(['users']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  });
  */
  }
  goToSignup(){
    this.router.navigate(['signup']);
  }
}

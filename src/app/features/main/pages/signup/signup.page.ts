import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage {

  firstname: string = '';
  lastname: string = '';
  email: string = '';
  confirmemail: string = '';
  username: string = '';
  password: string = '';
  confirmpassword: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private apiService:ApiService,
    private router: Router,
  ) {}

  ionViewWillEnter() {
    console.log('LoginPage is about to enter view');
  }
  ngOnInit() {
    console.log('LoginPage initialized');
  }
  signup() {
    console.log(this.username)
    this.loading = true;

  // Simulate a login process
  this.apiService.postData('auth/signup', {
    "firstname": this.firstname,
    "lastname": this.lastname,
    "email": this.email,
    "username": this.username,
    "password": this.password,
    "role":1
    }).subscribe((res: any) => {
    this.loading = false;
    if (res.data.user) {
      console.log('Login successful');
      this.errorMessage = '';

      // Save user data to localStorage
      const user = res.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate to the users page
      this.router.navigate(['users']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  });

    

  }
}

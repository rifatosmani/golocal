import { Component } from '@angular/core';
import { ApiService } from '../../../../core/services/api/api.service';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './starter.page.html',
  styleUrls: ['./starter.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StarterPage {
  constructor(
    private authService:AuthService,
    private router: Router,
  ) {}
  ngOnInit() {
    console.log('starter page');
    this.authService.checkSession();
  }

}

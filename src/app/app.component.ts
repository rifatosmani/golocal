import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false,
})
export class AppComponent {
  constructor(private location:Location,private router:Router) {}
  goBack(){
    this.location.back();
  }
  canGoBack(): boolean {
    const excludedPaths = ['/home', '/login']; // List of paths where 'Back' is not allowed
    const currentUrl = this.router.url; // Get the current URL
  
    // Return true if the current URL is NOT in the excluded list
    return !excludedPaths.includes(currentUrl);
  }
}

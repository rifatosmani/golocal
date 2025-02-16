import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryPhotos } from '@capacitor/camera';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CameraService } from 'src/app/core/services/camera/camera.service';

@Component({
  selector: 'app-creator-card',
  templateUrl: './creator-card.component.html',
  styleUrls: ['./creator-card.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule]
})
export class CreatorCardComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

  goToMySites(){
    this.router.navigate(['my-sites']);
  }

  goToAddSite(){
    this.router.navigate(['add-site']);
  }

}
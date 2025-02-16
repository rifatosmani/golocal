import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Media } from 'src/app/models/media.model';
import { Site } from 'src/app/models/site.model';

@Component({
  selector: 'app-site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule]
})
export class SiteCardComponent  implements OnInit {
  @Input() site!: Site; // Define an Input property

  constructor() { }

  ngOnInit() {}

    getMainMediaUrl(){
      if(this.site){
        let media:Media[] =  this.site.media.filter(med=> med.main == true || med.main == null);
        if(media.length != 0){
          return media[0].url;
        }
      }
      return null;
    }

}

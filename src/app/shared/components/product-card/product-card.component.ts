import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Media } from 'src/app/models/media.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule]
})
export class ProductCardComponent  implements OnInit {

  @Input() product!: Product; // Define an Input property

  constructor() { }

  ngOnInit() {}

    getMainMediaUrl(){
      if(this.product){
        let media:Media[] =  this.product.media.filter(med=> med.main == true || med.main == null);
        if(media.length != 0){
          return media[0].url;
        }
      }
      return null;
    }

}

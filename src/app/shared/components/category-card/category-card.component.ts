import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Category } from 'src/app/models/category.model';
import { Media } from 'src/app/models/media.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule]
})
export class CategoryCardComponent  implements OnInit {

  @Input() category!: Category; // Define an Input property


  @Input() selectedCategory!: number|undefined; // Define an Input property


  constructor() { }

  ngOnInit() {}

  getMainMediaUrl(){
    if(this.category){
      let media:Media[] =  this.category.media.filter(cat=> cat.main == true || cat.main == null);
      if(media.length != 0){
        return media[0].url;
      }
    }
    return null;
  }

  isSelected():boolean{
    if(this.category){
      return this.selectedCategory == this.category.categoryId;
    }
    return false;
  }
}

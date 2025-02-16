import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  standalone: true,
  imports:[IonicModule,CommonModule]
})
export class ImageCardComponent  implements OnInit {
  url!:string;
  
  constructor(private modalController:ModalController) { }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}

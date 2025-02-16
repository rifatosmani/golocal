import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { ChatComponent } from 'src/app/features/chat/components/chat.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UsersPage implements OnInit {

  constructor(
    private apiService:ApiService,private modalCtrl:ModalController
  ) { }

  public users:any;

  ngOnInit() {
    let user:any = localStorage.getItem('user');
    if(user != null){
      user = JSON.parse(user);
    }
    this.apiService.getData('api/user')
    .pipe(
      map((res: any) => res.data.filter((u: any) => user!=null && u.userId !== user.userId))
    )
    .subscribe((filteredUsers: any[]) => {
      this.users = filteredUsers;
    });
    console.log(user);

  }

  async onUserClick(user: any) {
    console.log(user);
    const modal = await this.modalCtrl.create({
      component: ChatComponent,
      componentProps: { user }, // Pass the user as a prop
    });
    await modal.present();
  }

}

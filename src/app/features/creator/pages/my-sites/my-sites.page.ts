import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SiteService } from 'src/app/core/services/site/site.service';
import { Site } from 'src/app/models/site.model';
import { SiteCardComponent } from 'src/app/shared/components/site-card/site-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-sites',
  templateUrl: './my-sites.page.html',
  styleUrls: ['./my-sites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SiteCardComponent]
})
export class MySitesPage implements OnInit {

  constructor(private siteService:SiteService,private router:Router) { }
  mySites!: Site[];

  ngOnInit() {
    this.siteService.getMySites().subscribe((res: Site[]) => {
      this.mySites = res;
    })
  }
  onSelectSite(site: Site) {
    this.router.navigate([`/site/${site.siteId}`],{state:site});
  }


}

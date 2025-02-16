import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { UserService } from 'src/app/core/services/user/user.service';
import { IonicModule, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Category, CategoryTree } from 'src/app/models/category.model';
import { CategoryCardComponent } from 'src/app/shared/components/category-card/category-card.component';
import { SiteService } from 'src/app/core/services/site/site.service';
import { Site } from 'src/app/models/site.model';
import { SiteCardComponent } from 'src/app/shared/components/site-card/site-card.component';
import { Router } from '@angular/router';
import { CreatorCardComponent } from 'src/app/shared/components/creator-card/creator-card.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, CategoryCardComponent, SiteCardComponent,CreatorCardComponent]
})
export class HomePage implements OnInit {
  categoryTree!: CategoryTree;
  selectedCategory!: Category;
  explore: Category = { categoryId: 0, name: 'Explore', description: 'Explore', addDate: null, modDate: null, status: 1, media: [{ mediaId: 0, fileName: 'explore', refId: 0, refTable: '', main: true, addDate: '', modDate: '', url: 'assets/golocal/explore.png', status: 1 }] };

  sites!: Site[];

  constructor(private userService: UserService,
    private categoryService: CategoryService,
    private siteService: SiteService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser();
    this.categoryService.getCategoryTree().subscribe((res: CategoryTree) => {
      this.categoryTree = res;
    })
    this.siteService.sites$.subscribe((sites) => {
      console.log(sites);
      this.sites = sites;
    });
    this.onSelectCategory(this.explore);
  }
  onSelectCategory(cat: Category) {
    if (this.selectedCategory != cat) {
      console.log('ciaoo');
      this.selectedCategory = cat;
      this.siteService.getSiteByCategory(cat.categoryId).subscribe((res: Site[]) => {
        this.siteService.setSites(res); // Store in service
      },
    (error)=>{
      console.log(error);
    })
    }
  }
  onSelectSite(site: Site) {
      this.router.navigate([`/site/${site.siteId}`],{state:site});
  }
}

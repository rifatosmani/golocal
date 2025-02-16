import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from 'src/app/models/site.model';
import { IonicModule, ModalController } from '@ionic/angular';
import { SiteCardComponent } from 'src/app/shared/components/site-card/site-card.component';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/models/product.model';
import { ProductCardComponent } from 'src/app/shared/components/product-card/product-card.component';
import { ImageCardComponent } from 'src/app/shared/components/image-card/image-card.component';
import { SiteService } from 'src/app/core/services/site/site.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.page.html',
  styleUrls: ['./site.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SiteCardComponent, ProductCardComponent]
})
export class SitePage implements OnInit {

  site!: Site;
  siteId!: number;
  products!: Product[];
  constructor(
    private router: Router,
    private productService: ProductService,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private siteService: SiteService,
    private authService:AuthService
  ) {
  }

  ngOnInit() {
    this.siteService.sites$.subscribe((sites) => {
      console.log(sites);
      if(this.site)
        this.site = sites.find((site: Site) => site.siteId === this.site.siteId)??this.site;
    });

    const navigation = this.router.getCurrentNavigation();
    this.site = navigation?.extras.state as Site;


    if (!this.site) {
      this.fetchSiteAndProducts();
    } else {
      this.fetchProductsBySite(this.site.siteId);
    }


  }
  async openImageModal(url: string) {
    const modal = await this.modalCtrl.create({
      component: ImageCardComponent,
      componentProps: { url }, // Pass the user as a prop
    });
    await modal.present();
  }
  /**
 * Fetches the site by ID and its associated products.
 */
  private fetchSiteAndProducts() {
    const siteId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(siteId)) {
      console.error('Invalid or missing site ID in the route.');
      this.router.navigate(['home']);
      return;
    }


    this.siteService.getSiteById(Number(siteId)).subscribe({
      next: (site: Site) => {
        this.site = site;
        this.fetchProductsBySite(site.siteId);
      },
      error: (err) => {
        console.error('Error fetching site:', err);
        this.router.navigate(['home']);
      },
    });
  }

  /**
   * Fetches products for a given site ID.
   * @param siteId - The ID of the site
   */
  private fetchProductsBySite(siteId: number) {
    this.productService.getProductBySite(siteId).subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.router.navigate(['home']);
      },
    });
  }

  public canChangeSite(){
    if(this.site.userId == this.authService.getUser()?.userId){
      return true;
    }
    return false;
  }

  public updateSite(){
    this.router.navigate([`/add-site/${this.site.siteId}`],{state:this.site});
  }
}

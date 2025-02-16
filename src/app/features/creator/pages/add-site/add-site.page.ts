import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CameraService } from 'src/app/core/services/camera/camera.service';
import { GalleryPhotos } from '@capacitor/camera';
import { CategoryTree } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/core/services/address/address.service';
import { Site } from 'src/app/models/site.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SiteService } from 'src/app/core/services/site/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from 'src/app/models/media.model';
import { MediaService } from 'src/app/core/services/media/media.service';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.page.html',
  styleUrls: ['./add-site.page.scss'],
  standalone: true,
imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AddSitePage implements OnInit {
  addSiteForm!: FormGroup;
  categoryTree!:CategoryTree;

  site!:Site;

  private imageListSubject = new BehaviorSubject<Media[]>([]);
  imageList$ = this.imageListSubject.asObservable(); // Expose as Observable
  
  mainMediaUrl: string = 'assets/golocal/image-outline.svg';


  constructor(private formBuilder:FormBuilder,private cameraService:CameraService,private categoryService:CategoryService,
    private authService:AuthService,
    private siteService:SiteService,
    private router:Router,
    private route: ActivatedRoute,
    private mediaService:MediaService,
    private location:Location,
  ) { }

  ngOnInit() {
       this.addSiteForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          description: ['', [Validators.required]],
          extDescription: ['', [Validators.required]],          
          country: ['', [Validators.required]],          
          city: ['', [Validators.required]],          
          address: ['', [Validators.required]],        
          zipCode: ['', [Validators.required]],
          category:[null]          
        });
        this.categoryService.getCategoryTree().subscribe((res:CategoryTree)=>{
          this.categoryTree = res;
          console.log(res);
        });
        const siteId = Number(this.route.snapshot.paramMap.get('id'));
        if(siteId){
          const navigation = this.router.getCurrentNavigation();
          this.site = navigation?.extras.state as Site;
          this.populateFormWithSite(this.site);
        }
      }

      addImage(newImage: Media) {
        // Get the current list, add the new image, and update the BehaviorSubject
        this.mediaService.saveMedia(newImage).subscribe((media:Media)=>{
          console.log(media);
          const updatedList = [...this.imageListSubject.value, media];
          this.imageListSubject.next(updatedList);
          this.site.media = this.imageListSubject.value;
          this.siteService.updateSite(this.site); // 🔹 Triggers automatic update in Sites Page
  
        });
       }

      removeImage(image: Media) {
        // Filter out the removed image and update the BehaviorSubject
        this.mediaService.deleteMedia(image);
        const updatedList = this.imageListSubject.value.filter(img => img !== image);
        this.imageListSubject.next(updatedList);
        this.site.media = updatedList;
        this.siteService.updateSite(this.site); // 🔹 Triggers automatic update in Sites Page

      }
      
      addMainImage(newImage: Media) {
        this.mediaService.saveMedia(newImage).subscribe((media:Media)=>{
          console.log(media);
          // Get the current list, add the new image, and update the BehaviorSubject
          this.mediaService.saveMedia(newImage);
          let updatedList = this.imageListSubject.value.filter(img => img.main !== true);
          updatedList = [...updatedList, newImage];
          this.imageListSubject.next(updatedList);
          this.updateMainMediaUrl();
          this.site.media = this.imageListSubject.value;
          console.log(this.site)
          this.siteService.updateSite(this.site); // 🔹 Triggers automatic update in Sites Page
        });
      }

  onSelectMainImage(){
    this.cameraService.pickImages$({limit:1}).subscribe((res:GalleryPhotos)=>{
      console.log(res);
      let media:Media = {
        mediaId:0,
        url:res.photos[0].webPath,
        refId:this.site.siteId??0,
        refTable:'site',
        main:true,
        status:1,
        fileName:''
      }
      this.addMainImage(media);
    })
    
  }

  updateMainMediaUrl() {
    const media = this.imageListSubject.value.filter(med => med.main === true || med.main == null);
    this.mainMediaUrl = media.length ? media[0].url : 'assets/golocal/image-outline.svg';
  }
  onSelectImage(){
    this.cameraService.pickImages$({limit:1}).subscribe((res:GalleryPhotos)=>{
      console.log(res);
      let media:Media = {
        mediaId:0,
        url:res.photos[0].webPath,
        refId:this.site.siteId,
        refTable:'site',
        main:false,
        status:1,
        fileName:''
      }
      this.addImage(media);
    })
  }

  saveSite() {
    const siteData = this.prepareSiteData();
    
    this.siteService.saveSite(siteData).subscribe({
      next: (res: Site) => {
        console.log(this.site ? 'Updated site:' : 'Created site:', res);
        this.site = res;
        this.siteService.updateSite(this.site); // 🔹 Triggers automatic update in Sites Page
        // Navigate after a successful response
        //this.router.navigate([`/site/${this.site.siteId}`], { state: this.site });
        this.location.back();
      },
      error: (err) => {
        console.error("Error saving site:", err);
      }
    });
  }
  
  /**
   * Prepares the site data object based on form values.
   */
  private prepareSiteData(): Site {
    const address: Address = {
      address: this.addSiteForm.value.address,
      zipCode: this.addSiteForm.value.zipCode,
      country: this.addSiteForm.value.country,
      city: this.addSiteForm.value.city,
      longitude: 0, // Replace with actual longitude if needed
      latitude: 0   // Replace with actual latitude if needed
    };
  
    return {
      siteId: this.site?.siteId ?? 0,
      name: this.addSiteForm.value.name,
      description: this.addSiteForm.value.description,
      extDescription: this.addSiteForm.value.extDescription,
      categoryId: this.addSiteForm.value.category,
      address: address,
      status: this.site?.status ?? 1, // Keep status if updating, default to 1 otherwise
      userId: this.authService.getUser()?.userId ?? 0,
      modDate: this.site ? new Date().toISOString() : undefined, // Only update modDate if editing
      media: [] // Keep existing media if updating
    };
  }

  populateFormWithSite(site: Site): void {
    if (!site) return; // Ensure site is not null or undefined
  
    this.addSiteForm.patchValue({
      name: site.name,
      description: site.description,
      extDescription: site.extDescription,
      country: site.address?.country ?? '',
      city: site.address?.city ?? '',
      address: site.address?.address ?? '',
      zipCode: site.address?.zipCode ?? '',
      category: site.categoryId ?? null,
    });

    this.imageListSubject.next(this.site.media); // Update state
    this.updateMainMediaUrl();
  }
  
}

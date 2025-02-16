import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Site } from 'src/app/models/site.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private apiService: ApiService) { }

  private sitesSubject = new BehaviorSubject<Site[]>([]);
  sites$ = this.sitesSubject.asObservable();

  getSites(): Site[] {
    return this.sitesSubject.value;
  }

  setSites(sites: Site[]) {
    this.sitesSubject.next(sites);
  }

  updateSite(updatedSite: Site) {
    const updatedSites = this.sitesSubject.value.map(site =>
      site.siteId === updatedSite.siteId ? updatedSite : site
    );
    this.sitesSubject.next(updatedSites);
  }

  public getSiteByCategory(categoryId: number): Observable<Site[]> {
    if(categoryId){
      return this.apiService.getData('api/site/category/' + categoryId).pipe(map((res: ApiResponse<Site[]>) => res.data));
    }else{
      return this.apiService.getData('api/site').pipe(map((res: ApiResponse<Site[]>) => res.data));
    }
  }

  public getSiteById(siteId: number): Observable<Site> {
      return this.apiService.getData('api/site/' + siteId).pipe(map((res: ApiResponse<Site>) => res.data));
  }

  public getMySites(): Observable<Site[]> {
    return this.apiService.getData('api/site/me').pipe(map((res: ApiResponse<Site[]>) => res.data));
  }

  public saveSite(site:Site):Observable<Site>{
    return this.apiService.postData('api/site',site).pipe(map((res:ApiResponse<Site>) => res.data));
  }
}

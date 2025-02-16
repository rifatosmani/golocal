import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Product } from 'src/app/models/product.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService:ApiService) { }

  getProductBySite(siteId:number){
      return this.apiService.getData('api/product/site/'+siteId).pipe(map((res: ApiResponse<Product[]>) => res.data));
  }
}

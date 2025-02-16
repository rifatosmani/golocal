import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Category, CategoryTree } from 'src/app/models/category.model';
import { ApiResponse } from 'src/app/models/api-response.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService:ApiService) { }

  public getCategoryTree():Observable<CategoryTree>{
    return this.apiService.getData('api/category').pipe(map((res:ApiResponse<CategoryTree>)=>res.data));
  }
}

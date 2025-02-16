import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Address } from 'src/app/models/address.model';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private apiService:ApiService) { }

  createNewAddress(address:Address):Observable<Address>{
    return this.apiService.postData('api/address',address).pipe(map((res:ApiResponse<Address>)=>res.data));
  }
}

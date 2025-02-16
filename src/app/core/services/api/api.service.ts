import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class ApiService {
  private baseUrl = 'http://localhost:4200'; // Replace with your API's base URL

  constructor(private http: HttpClient) {}

  // Example: GET request to fetch data
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  // Example: POST request to send data
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // Example: PUT request to update data
  updateData(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data);
  }

  // Example: DELETE request to delete data
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }
}

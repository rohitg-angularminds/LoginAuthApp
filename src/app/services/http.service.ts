import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL = 'https://shop-api.ngminds.com';
  
  constructor(
    private http: HttpClient,
    private userService: LocalstorageService
  ) {  }

  post(formData: any, url: string): Observable<any> {
    return this.http.post(`${this.baseURL}${url}`, formData);
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.baseURL}${url}`);
  }

  delete(url: string) {
    return this.http.delete(`${this.baseURL}${url}`);
  }

  patch(url: string, formData: any) {
    return this.http.patch(`${this.baseURL}${url}`, formData);
  }

  put(url: string, formData: any) {
    return this.http.put(`${this.baseURL}${url}`, formData);
  }


  getState(url: string): Observable<any> {
   let headers = new HttpHeaders();
    headers.append("X-CSCAPI-KEY", "API_KEY")
    return this.http.get(`${url}`, { headers: headers});
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  set(key :string, value:any){
    localStorage.setItem(key,value);
  }

  get(key :string){
    return localStorage.getItem(key);
  }

  delete(key :string){
    localStorage.removeItem(key);
  }

   isLoggedin = new Observable((subscriber) => {
      subscriber.next(localStorage.getItem('customerToken') !== null ? true : false)
   })

}

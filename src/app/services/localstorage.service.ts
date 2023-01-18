import { Injectable } from '@angular/core';

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

}

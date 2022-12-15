import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setUserToken(token : string){
    localStorage.setItem('token', token)
  }

  getUserToken(){
    return localStorage.getItem('token')
  }

  deleteUserToken(){
    localStorage.removeItem('token');
  }


}

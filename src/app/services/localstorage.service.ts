import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setUserToken(token :any){
    console.log(token)
    localStorage.setItem('token',token);
  }

  getUserToken(){
    return localStorage.getItem('token');
  }

  deleteUserToken(){
    localStorage.removeItem('token');
  }

  getProductid(){
    return localStorage.getItem('productId')
  }


}

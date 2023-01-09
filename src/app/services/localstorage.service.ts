import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setUserToken(token :any){
    localStorage.setItem('token',token);
  }

  getUserToken(){
    return localStorage.getItem('token');
  }

  deleteUserToken(){
    localStorage.removeItem('token');
  }

  getProductid(){
    return localStorage.getItem('product_Id')
  }

  setProductId(product_Id : any){
      localStorage.setItem('product_Id', product_Id)
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  shoppingProducts: Array<any> = []

  constructor(
    private http: HttpService,
    private userService : LocalstorageService
  ) { }

  custLoggedStatus: Boolean = this.isLoggedin()
  username : string | null = localStorage.getItem('customer.name')
  
  ngOnInit(): void {

    this.getShoppingProducts();
  }


  getShoppingProducts(){
    this.http.get('/shop/products').subscribe(
      {next: (res) =>
         {
        this.shoppingProducts = res.results
        
      }
    }
    )
  }

  isLoggedin(): Boolean{
    return this.userService.getUserToken() !== null ? true : false;
  }

  custLogout(){
    this.userService.deleteUserToken();
    localStorage.removeItem('username');
    this.custLoggedStatus= this.isLoggedin();
  }
}

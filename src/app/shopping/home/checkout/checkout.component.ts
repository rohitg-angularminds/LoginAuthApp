import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  myinfo: Boolean = true;
  payload: any = JSON.parse(this.userService.get('payload') || '');
  isOrderCreated! : boolean ;

  constructor(
    private userService: LocalstorageService,
    private http: HttpService
  ) {}

  @Output() custLoggedStatus: Boolean = this.isLoggedin();

  ngOnInit(): void {}

  isLoggedin(): Boolean {
    return this.userService.get('customerToken') !== null ? true : false;
  }

  createOrder() {
    this.http.post(this.payload, '/shop/orders').subscribe( {
      next : (data) => {
        console.log(data);
        this.isOrderCreated = true
      },
      error : (err) => {console.log(err)}
    })
  }

  getShippingMethod(method: string) {
    this.payload.deliveryFee = method == 'free' ? 0 : 40;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private http:HttpService, private router:Router) { }

  myOrders : any ;
  orderDetails: any;

  ngOnInit(): void {
    this.getOrderHistory()

  }


  getOrderHistory(){
      this.http.get('/shop/orders').subscribe({
        next: (data) => {
          this.myOrders =  data.results;
          console.log(this.myOrders);

        },
        error: (err) => {

        }
      })
  }

  getOrderDetails(orderId : any){

      this.http.get(`/shop/orders/${orderId}`).subscribe({
          next: (res) => { console.log(res);
          }
      })
  }

}

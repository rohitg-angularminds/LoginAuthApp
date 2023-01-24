import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { filter, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(
    private http: HttpService,
    private router: Router,
    private toast: HotToastService,
    private userService: LocalstorageService
  ) {}

  myOrders: any;
  orderDetails: any;
  items: any;
  active: boolean = false;

  limit: number = 10;
  page: number = 1;
  totalResults!: number;

  ngOnInit(): void {
    this.getOrderHistory();
  }

  getOrderHistory() {
    this.http
      .get(`/shop/orders?limit=${this.limit}&page=${this.page}`)
      .subscribe({
        next: (data) => {
          this.myOrders = data.results;
          this.totalResults = data.totalResults;
          console.log(data);
        },
        error: (err) => {},
      });
  }

  getFilteredHistory(status: string) {
    this.http
      .get(`/shop/orders`)
      .pipe(
        map((response) => response.results),
        map((results: any) =>
          results.filter((result: any) => result?.status === status)
        )
      )
      .subscribe({
        next: (data) => {
          this.myOrders = data;
          console.log(this.myOrders);
        },
        error: (err) => {},
      });
    this.active = true;
  }

  getOrderDetails(orderId: any) {
    this.http.get(`/shop/orders/${orderId}`).subscribe({
      next: (res) => {
        this.orderDetails = res;
        this.items = res?.items;
        // console.log(this.orderDetails);
        this.userService.set('orderId', this.orderDetails._id);
      },
    });
  }

  cancelOrder(orderId: any) {
    this.http.patch(`/shop/orders/cancel/${orderId}`, {}).subscribe({
      next: (res) => {
        this.toast.success('order cancelled');
        this.getOrderHistory();
      },
    });
  }

  // pagination
  onPageChange(event: any) {
    this.page = event;
    this.getOrderHistory();
  }
  onTableSizeChange(event: any): void {
    this.limit = event.target.value;
    this.page = 1;
    this.getOrderHistory();
  }
}

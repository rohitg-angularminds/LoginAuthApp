import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  stepDownCounter,
  stepUpCounter,
  getTotalAmount,
  removeItem,
} from 'src/app/state/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private store: Store<{ cart: any; totalAmount: any }>,
    private userService: LocalstorageService
  ) {}

  products: any;
  quantity!: number;
  totalAmount!: number;

  ngOnInit(): void {
    this.getTotalAmount();
    this.store.select('cart').subscribe((data) => {
      this.products =
        JSON.parse(this.userService?.get('cart') || '[]')?.products || [];
      this.totalAmount = data.totalAmount;
    });
  }

  stepDown(productId: number) {
    this.store.dispatch(stepDownCounter({ productId: productId }));
    this.store.dispatch(getTotalAmount());
  }
  removeItem(productId: number) {
    console.log('hii');
    this.store.dispatch(removeItem({ productId: productId }));
  }

  stepUp(productId: number) {
    this.store.dispatch(stepUpCounter({ productId: productId }));
    this.store.dispatch(getTotalAmount());
  }

  getTotalAmount() {
    this.store.dispatch(getTotalAmount());
  }
}

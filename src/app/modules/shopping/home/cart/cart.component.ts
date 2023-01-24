import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnyFn } from '@ngrx/store/src/selector';
import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  stepDownCounter,
  stepUpCounter,
  getTotalAmount,
  updateQuantity,
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

  @Output() custLoggedStatus: Boolean = this.isLoggedin();

  ngOnInit(): void {
    this.getTotalAmount();
    this.store.select('cart').subscribe((data) => {
      this.products =
        JSON.parse(this.userService?.get('cart') || '[]')?.products || [];
      this.totalAmount = data.totalAmount;
    });
  }

  getInput(productId: number, qty: string) {
    this.store.dispatch(
      updateQuantity({ productQty: +qty, productId: productId })
    );
    this.store.dispatch(getTotalAmount());
  }

  stepDown(productId: number) {
    this.store.dispatch(stepDownCounter({ productId: productId }));
    this.store.dispatch(getTotalAmount());
  }

  stepUp(productId: number) {
    this.store.dispatch(stepUpCounter({ productId: productId }));
    this.store.dispatch(getTotalAmount());
  }

  getTotalAmount() {
    this.store.dispatch(getTotalAmount());
  }

  isLoggedin(): Boolean {
    return this.userService.get('customerToken') !== null ? true : false;
  }
}

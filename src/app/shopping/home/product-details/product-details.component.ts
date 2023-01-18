import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {addToCart, getTotalAmount} from '../../../state/cart.actions'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private http: HttpService,
    private userService: LocalstorageService,
    private store: Store<{cart : any}>
  ) {}

  productDetails!: any;
  productId: any = this.userService.get('product_Id');

  ngOnInit(): void {
    this.getProductDetails();
  }

  // funtion to get product details
  getProductDetails() {
    this.http.get(`/shop/products/${this.productId}`).subscribe({
      next: (data) => {
        this.productDetails = data;
      },
    });
  }

  addToCart(){
    this.productDetails.qty = 1 ;
    this.productDetails.totalPrice = this.productDetails.price
    this.store.dispatch(addToCart(this.productDetails))
    this.store.dispatch(getTotalAmount());
  }


}

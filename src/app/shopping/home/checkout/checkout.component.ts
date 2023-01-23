import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private userService: LocalstorageService,
    private http: HttpService,
    private toast: HotToastService,
    private router: Router,
    private store: Store<{ buy: any; totalAmount: any }>
  ) {}

  customerAddress!: any;
  customerName: any;
  customerEmail: any;
  selectedAddress: any;
  deliveryFee: number = 0;
  subTotal: any = JSON.parse(this.userService.get('cart') || '[]')?.totalAmount;
  total: number = this.deliveryFee + this.subTotal;
  items: any = [];
  orderId: any =this.userService.get('orderId');
  products: any;


  paymentForm!: FormGroup;
  @Output() custLoggedStatus: Boolean = this.isLoggedin();

  ngOnInit(): void {
    this.custLoggedStatus
      ? (this.getcustomerAddress(), this.getCustomerProfile())
      : '';

    this.products =
      JSON.parse(this.userService?.get('cart') || '[]')?.products || [];

    // this.store.select('buy').subscribe({
    //   next: (data) => {
    //     this.products = data.products;
    //     this.subTotal = data.totalAmount;
    //   },
    // });

    // payment form
    this.paymentForm = new FormGroup({
      nameOnCard: new FormControl('', Validators.required),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{16}$'),
      ]),
      expiry: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])/([0-9]{4})$'),
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$'),
      ]),
    });
  }

  isLoggedin(): Boolean {
    return this.userService.get('customerToken') !== null ? true : false;
  }

  getcustomerAddress() {
    this.http.get('/customers/address').subscribe({
      next: (data) => {
        this.customerAddress = data;
      },
    });
  }

  getSelectedAdd(address: any) {
    delete address?._id;
    this.selectedAddress = address;
  }

  getShippingMethod(method: string) {
    this.deliveryFee = method == 'free' ? 0 : 40;
    this.total = this.deliveryFee + this.subTotal;
  }

  createOrder() {
    const cartDetails = JSON.parse(
      this.userService.get('cart') || '[]'
    )?.products;

    cartDetails.map((product: any) => {
      const temp = {
        productId: product?._id,
        name: product?.name,
        price: product?.price,
        qty: product?.qty,
        subTotal: product?.totalPrice,
      };
      this.items.push(temp);
    });

    const payload = {
      items: this.items,
      address: this.selectedAddress,
      total: this.subTotal + this.deliveryFee,
      deliveryFee: this.deliveryFee,
    };

    this.http.post(payload, '/shop/orders').subscribe({
      next: (data) => {
        console.log(data);
        this.userService.set('orderId', data.order._id);
        this.orderId = this.userService.get('orderId');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  placeOrder() {
    this.orderId = this.userService.get('orderId');

    this.http
      .put(`/shop/orders/confirm/${this.orderId}`, this.paymentForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success('order placed successfully');
          this.router.navigate(['/profile']);
          this.userService.delete('orderId')
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // function for customer profile
  getCustomerProfile() {
    this.http.get('/shop/auth/self').subscribe({
      next: (data) => {
        this.customerName = data.name;
        this.customerEmail = data.email;
      },
    });
  }

  changeAddress() {
    this.orderId = null;
  }

  customerLogin() {}
}

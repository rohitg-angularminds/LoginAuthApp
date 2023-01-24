import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor( private userService: LocalstorageService,
    private http: HttpService,
    private toast: HotToastService,
    private router: Router,) { }

  paymentForm!: FormGroup;
  orderId : any;
  ngOnInit(): void {

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

  placeOrder() {
    this.orderId = this.userService.get('orderId');

    this.http
      .put(`/shop/orders/confirm/${this.orderId}`, this.paymentForm.value)
      .subscribe({
        next: (res) => {
          this.toast.success('order placed successfully');
          this.router.navigate(['/profile/orders']);
          this.userService.delete('orderId')
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

}

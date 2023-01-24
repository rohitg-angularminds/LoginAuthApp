import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(
    private http: HttpService,
    private userService: LocalstorageService,
    private router: Router
  ) {}

  customerDetails!: any;

  @Output() custLoggedStatus: Boolean = this.isLoggedin();

  ngOnInit(): void {
    this.getCustomerProfile();
  }

  // function for customer profile

  getCustomerProfile() {
    this.http.get('/shop/auth/self').subscribe({
      next: (data) => {
        this.customerDetails = data;
      },
    });
  }

  //  function for customer logout
  customerLogout() {
    this.userService.delete('customerToken');
    Swal.fire({
      title: 'Logged out successfully',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'continue shopping'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/');
      }
    })
  }

  //  function for delete account
  deleteAccount() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('/customers/account').subscribe({
          next: (res) => {
            this.userService.delete('customerToken');
            this.custLoggedStatus = this.isLoggedin();
            this.router.navigateByUrl('/home');
          },
        });
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  isLoggedin(): Boolean {
    return this.userService.get('customerToken') !== null ? true : false;
  }
}

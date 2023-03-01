import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map, pairwise } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  constructor(private http: HttpService, private router: Router, private userService: LocalstorageService) {


  }

  customerAddress!: any;
  newAddressForm!: FormGroup;
  addressId!: any;
  customerName: any;
  currentRoute!: string;
  selectedAddress: any;
  items : any =[]

  ngOnInit(): void {
    this.getcustomerAddress();
    this.getCustomerProfile();

    // new address form
    this.newAddressForm = new FormGroup({
      street: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pin: new FormControl(''),
    });
  }

  getcustomerAddress() {
    this.http.get('/customers/address').subscribe({
      next: (data) => {
        this.customerAddress = data;
      },
    });
  }

  getSelectedAdd(address : any){
    delete address?._id
   this.selectedAddress = address
  }

  createOrder(){
    const cartDetails = JSON.parse(this.userService.get('cart') || '[]')?.products
    const amount = JSON.parse(this.userService.get('cart') || '[]')?.totalAmount

    cartDetails.map((product:any) => {
      const temp = {
          productId : product?._id,
          name: product?.name,
          price: product?.price,
          qty: product?.qty,
          subTotal : product?.totalPrice,
      }
      this.items.push(temp);
    })

    const payload = {
      items : this.items,
      address: this.selectedAddress,
      total: amount
    }

    this.userService.set('payload', JSON.stringify(payload))
  }

  addNewAddress() {
    this.http.post(this.newAddressForm.value, '/customers/address').subscribe({
      next: (response) => {
        this.getcustomerAddress();
      },
    });
  }

  getaddressId(addressId: any, i: number) {
    this.addressId = addressId;

    this.newAddressForm = new FormGroup({
      street: new FormControl(this.customerAddress[i].street),
      addressLine2: new FormControl(this.customerAddress[i].addressLine2),
      city: new FormControl(this.customerAddress[i].city),
      state: new FormControl(this.customerAddress[i].state),
      pin: new FormControl(this.customerAddress[i].pin),
    });
  }

  updateAddress() {
    this.http
      .put(`/customers/address/${this.addressId}`, this.newAddressForm.value)
      .subscribe({
        next: (res) => {
          this.addressId = undefined;
          this.getcustomerAddress();
        },
      });
  }

  deleteAddress(addressId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'skyblue',
      confirmButtonText: 'delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`/customers/address/${addressId}`).subscribe({
          next: (res) => {
            Swal.fire(
              'Deleted!',
              'success'
            )
            this.getcustomerAddress();
          },
        })

      }
    })

  }

  // function for customer profile
  getCustomerProfile() {
    this.http.get('/shop/auth/self').subscribe({
      next: (data) => {
        this.customerName = data.name;
      },
    });
  }
}

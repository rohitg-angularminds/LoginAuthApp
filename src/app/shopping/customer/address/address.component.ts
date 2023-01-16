import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor( private http:HttpService) { }

  customerAddress! : any ;
  newAddressForm!: FormGroup;
  addressId! : any;
  customerName: any;

  ngOnInit(): void {

    this.getcustomerAddress();
    this.getCustomerProfile();

       // new address form
       this.newAddressForm = new FormGroup({
        street: new FormControl(''),
        addressLine2 : new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        pin: new FormControl('')
      })
  }

  getcustomerAddress(){
    this.http.get('/customers/address').subscribe({
      next : (data) => {
          this.customerAddress = data
      }
    })
  }

  addNewAddress(){
    this.http.post(this.newAddressForm.value,'/customers/address' ).subscribe({
      next : (response) => { this.getcustomerAddress()}
    })
  }

  getaddressId(addressId : any, i: number){
   this.addressId  = addressId

   this.newAddressForm = new FormGroup({
    street: new FormControl(this.customerAddress[i].street),
    addressLine2 : new FormControl(this.customerAddress[i].addressLine2),
    city: new FormControl(this.customerAddress[i].city),
    state: new FormControl(this.customerAddress[i].state),
    pin: new FormControl(this.customerAddress[i].pin)
  })

  }

  updateAddress(){
    this.http.put(`/customers/address/${this.addressId}`, this.newAddressForm.value).subscribe({
      next: (res) => {
        this.addressId = undefined;
         this.getcustomerAddress();
      }
    })
  }

  deleteAddress(){
    this.http.delete(`/customers/address/${this.addressId}`).subscribe({
        next: (res) => {this.getcustomerAddress()}
    })

  }

  // function for customer profile
  getCustomerProfile(){
    this.http.get('/shop/auth/self').subscribe({
        next: (data) => { this.customerName = data.name;
        }
    })
  }
}

import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {FormGroup, FormControl, Validators, Validator} from  '@angular/forms'
import { passwordValidator } from 'src/app/validators/custom-validators';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cust-profile',
  templateUrl: './cust-profile.component.html',
  styleUrls: ['./cust-profile.component.scss']
})
export class CustProfileComponent implements OnInit {

  constructor(private http : HttpService,
     private userService : LocalstorageService,
     private router : Router
     ) { }

  newAddressForm! : FormGroup
  changePasswordForm! : FormGroup
  updateProfileForm! : FormGroup

  customerDetails! : any ;
  customerAddress! : any ;
  accordionArray : any = ['collapseOne','collapseTwo','collapseThree','collapseFour','collapseFive' ]
  addressId! : any
  selectedImages: any = [] || null;
  updateImageForm! : FormGroup;
  profilePic!  : string ;

  @Output() errorMessage: any;
  @Output() custLoggedStatus: Boolean = this.isLoggedin()


  ngOnInit(): void {

    this.customerDetails = JSON.parse(localStorage.getItem('customer') || '');
      this.getcustomerAddress();

      // new address form
    this.newAddressForm = new FormGroup({
      street: new FormControl(''),
      addressLine2 : new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      pin: new FormControl('')
    })

    // change password form
    this.changePasswordForm = new FormGroup ({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    });

    // update profile form
    this.updateProfileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required])
    })

    // update image form
    this.updateImageForm = new FormGroup({
      picture : new FormControl()
    })

  }

  getcustomerAddress(){
    this.http.get('/customers/address').subscribe({
      next : (data) => {

        console.log(this.customerAddress)
          this.customerAddress = data
      }
    })
  }

  addNewAddress(){
    this.http.post(this.newAddressForm.value,'/customers/address' ).subscribe({
      next : (response) => { this.getcustomerAddress()}
    })
  }

  getaddressId(addressId : any){
   this.addressId  = addressId
  }

  updateAddress(){
    this.http.put(`/customers/address/${this.addressId}`, this.newAddressForm.value).subscribe({
      next: (res) => {
         this.getcustomerAddress()
      }

    })
  }

  deleteAddress(){
    this.http.delete(`/customers/address/${this.addressId}`).subscribe({
        next: (res) => {this.getcustomerAddress()}
    })

  }

  changePassword(){
    delete this.changePasswordForm.value.password;

    this.http.post(this.changePasswordForm.value, '/customers/auth/change-password').subscribe({
      next: (res) => {},
      error: (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => { this.errorMessage=undefined;}, 2000)

      }
    })
  }

  updateProfileInfo(){
    this.http.patch('/customers/update-profile',this.updateProfileForm.value).subscribe({
      next: (res) => {
        this.customerDetails = res
      }
    })
  }

  fillProfileInfo(){
    this.updateProfileForm = new FormGroup({
      name: new FormControl(this.customerDetails.name, [Validators.required]),
      email: new FormControl(this.customerDetails.email,[Validators.required])
    })
  }

  updateProfilePic(){
    const imgArray = Object.values(this.selectedImages)

    var formData = new FormData()
    imgArray.map((img:any) => {
      formData.append('picture',img)
    })

    this.http.post(formData,'/customers/profile-picture').subscribe({
        next: (res) => {
          this.profilePic = res.picture;
          this.customerDetails.picture = res.picture;
          localStorage.setItem('customer',JSON.stringify(this.customerDetails))
        }
    })
  }

  uploadImage(event : any){
    this.selectedImages = (event.target as HTMLInputElement).files

    this.updateImageForm.patchValue({
      'picture' : this.selectedImages
    })
    this.updateImageForm.get('picture')?.updateValueAndValidity()

}

customerLogout(){
  this.userService.deleteUserToken()
  localStorage.removeItem('customer')
  this.router.navigateByUrl('/home')
}

deleteAccount(){
  this.http.delete('/customers/account').subscribe({
    next: (res) => {
      this.userService.deleteUserToken();
      this.custLoggedStatus = this.isLoggedin()
      this.router.navigateByUrl('/home');
    }
  })
}

isLoggedin(): Boolean{
  return this.userService.getUserToken() !== null ? true : false;
}

}

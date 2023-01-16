import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import {FormGroup, FormControl, Validators, Validator} from  '@angular/forms'
import { passwordValidator } from 'src/app/services/validators/custom-validators';
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



  accordionArray : any = ['collapseOne','collapseTwo','collapseThree','collapseFour','collapseFive' ]
  addressId! : any




  ngOnInit(): void {










  }








  // fillProfileInfo(){
  //   this.updateProfileForm = new FormGroup({
  //     name: new FormControl(this.customerDetails.name, [Validators.required]),
  //     email: new FormControl(this.customerDetails.email,[Validators.required])
  //   })
  // }








}

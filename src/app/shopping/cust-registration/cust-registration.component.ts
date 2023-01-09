import { Component, OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cust-registration',
  templateUrl: './cust-registration.component.html',
  styleUrls: ['./cust-registration.component.scss']
})
export class CustRegistrationComponent implements OnInit {

  constructor(private http: HttpService) { }

  customerRegstrationForm! : FormGroup
  @Output() errorMessage = undefined

  ngOnInit(): void {
  
    this.customerRegstrationForm = new FormGroup({
      email : new FormControl('', [Validators.required, Validators.email]),
      name : new FormControl('', [Validators.required]),
      create_password : new FormControl('', [Validators.required]),
      password : new FormControl('',[Validators.required]),
      address : new FormGroup({
        street: new FormControl(''),
        addressLine2 : new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        pin: new FormControl('') 
      })
    })
  
  }

  customerRegistration(){
    delete this.customerRegstrationForm.value?.create_password
    console.log(this.customerRegstrationForm.value);
    
    this.http.post(this.customerRegstrationForm.value, '/shop/auth/register').subscribe({
      next: (res) => { console.log(res)},
      error: (err) => {
        console.log(err.message);
        
        this.errorMessage = err}
    })    

  }

  // getState(){
  //   this.http.getState('https://api.countrystatecity.in/v1/states').subscribe({
  //     next: (res) => { console.log(res);
  //     }
  //   })
  // }

}

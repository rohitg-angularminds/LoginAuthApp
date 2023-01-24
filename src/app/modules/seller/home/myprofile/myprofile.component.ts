import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  username!: string;
  useremail!: any;
  url: string = '/auth/self'
  loggedUserId! : any;
  company!: any;
  isVerified: boolean = false;
  errorMessage: any = undefined;


  constructor(public service: LocalstorageService,
    public httpService: HttpService,
    public fb: FormBuilder,
    public router: Router,
    private userService: LocalstorageService
    ) {

  }




  ngOnInit(): void {

   this.httpService.get('/auth/self').subscribe({
    next : (data:any) => {
          this.username = data?.name;
          this.useremail = data?.email
          this.company = data._org?.name
          this.isVerified = data.isEmailVerified
          localStorage.setItem('userDetails',JSON.stringify(data))
    }})

    }

    sendVerfmail(){
      this.httpService.post('', '/auth/send-verification-email').subscribe({
        next: data => {
        this.router.navigateByUrl('/seller/auth/verify-email')
      },error: err => {
        this.errorMessage = err.error.message;
      }

    })
    }



  }






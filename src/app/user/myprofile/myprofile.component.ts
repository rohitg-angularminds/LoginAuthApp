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


  constructor(public service: LocalstorageService,
    public httpService: HttpService,
    public fb: FormBuilder,
    public router: Router
    ) {

  }




  ngOnInit(): void {
    const token= localStorage.getItem('token');



   this.httpService.get('/auth/self').subscribe({next : (data:any) => {
          this.loggedUserId = data['_id'];
          localStorage.setItem('loggedUserId', this.loggedUserId);
          this.username = data?.name;
          this.useremail = data?.email
          this.company = data._org?.name
          this.isVerified = data.isEmailVerified
          console.log(data)
    }})

    }

    sendVerfmail(){
      this.httpService.post('', '/auth/send-verification-email').subscribe(data => {
        this.router.navigateByUrl('/auth/verify-email')

      })
    }



  }






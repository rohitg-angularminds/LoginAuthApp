import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-cust-login',
  templateUrl: './cust-login.component.html',
  styleUrls: ['./cust-login.component.scss'],
})
export class CustLoginComponent implements OnInit {
  constructor(
    private http: HttpService, 
    private userService: LocalstorageService,
    private router: Router
    ) {}

  customerLoginForm!: FormGroup;
  @Output() errorMessage: any = undefined;

  ngOnInit(): void {
    this.customerLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  customerLogin() {
    this.http.post(this.customerLoginForm.value, '/shop/auth/login').subscribe({
      next: (response) => {
        this.userService.setUserToken(response.token)
        localStorage.setItem('customer',JSON.stringify(response.customer))
        this.router.navigateByUrl('/home')
      },
      error: (err) => {
        console.log("hii", err)
        this.errorMessage = err.error.message
        // this.router.navigateByUrl('/login')
      },
    });
  }
}

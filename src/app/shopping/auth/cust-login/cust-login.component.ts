import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, map, Observable, pairwise } from 'rxjs';
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
    private router: Router,
    private toast: HotToastService
  ) {}

  previousURL: any;
  customerLoginForm!: FormGroup;
  @Output() errorMessage: any;
  @Output() successMessage: any;

  ngOnInit(): void {
    
    // this.router.events
    //   .pipe(
    //     filter((evt: any) => evt instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((events: RoutesRecognized[]) => {
    //     console.log('prev', typeof events[0].urlAfterRedirects);
    //     this.previousURL = events[0].urlAfterRedirects;
    //     console.log(this.previousURL);
    //     console.log('current url', events[1].urlAfterRedirects);
    //   });

    this.customerLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  customerLogin() {
    this.http.post(this.customerLoginForm.value, '/shop/auth/login').subscribe({
      next: (response) => {
        this.userService.set('customerToken', response.token);
        this.toast.success('logged in successfully');
        console.log(this.previousURL);
        history.back()

        // setTimeout(() => {
        //   this.previousURL === '/checkout'
        //     ? this.router.navigateByUrl('/checkout')
        //     : this.router.navigateByUrl('/');
        // }, 5000);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = undefined;
        }, 2000);
        this.router.navigateByUrl('/auth/login');
      },
    });
  }
}

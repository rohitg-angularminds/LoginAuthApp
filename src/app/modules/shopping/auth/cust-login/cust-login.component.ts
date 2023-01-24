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
  ) {
    router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
         this.userService.set('prevUrl',events[0].urlAfterRedirects) ;
      });
  }

  previousURL: any;
  customerLoginForm!: FormGroup;
  @Output() errorMessage: any;
  @Output() successMessage: any;

  ngOnInit(): void {
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

          this.userService.get('prevUrl') === '/checkout'
            ? this.router.navigateByUrl('/checkout')
            : (this.router.navigateByUrl('/'), this.userService.delete('prevUrl'));

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

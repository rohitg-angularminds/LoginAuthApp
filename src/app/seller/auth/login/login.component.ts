import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    public fb: FormBuilder,
    public userService: LocalstorageService,
    public httpService: HttpService,
    public router: Router,
    public authService: SocialAuthService
  ) {}

  loginForm!: FormGroup;
  userInputStatus!: string;
  errorMessage = undefined;
  googleCaptcha: string = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl(''),
    });

    this.getCaptcha()
  }

  get userInput() {
    return this.loginForm.value;
  }

  setLoginUserData() {
    this.loginForm.value.captcha = this.googleCaptcha;
    this.httpService.post(this.loginForm.value, `/auth/login`).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.token);
        this.router.navigateByUrl('/seller/my-profile');
      },
      error: (err) => {
        alert(err.error.message);
        this.getCaptcha();
      },
    });

  }

getCaptcha(){
  grecaptcha.ready(() => {
    grecaptcha
      .execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', {
        action: 'submit',
      })
      .then((token) => {
        this.googleCaptcha = token;
      });
  });
}


  forgotPassword() {
    this.httpService
      .post({ email: this.loginForm.value.email }, '/auth/forgot-password')
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/seller/auth/reset-password');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }

  socialLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.httpService
        .post({ token: data.idToken }, '/seller/auth/login/google')
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/seller/my-profile');
          },
          error: (err) => console.log(err),
        });
    });
  }
}

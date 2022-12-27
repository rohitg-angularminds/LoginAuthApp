import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
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
    public authService: SocialAuthService,
    public recaptchaV3Service: ReCaptchaV3Service
  ) {}

  loginForm!: FormGroup;
  userInputStatus!: string;
  errorMessage = undefined;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl('', [Validators.required]),

    });
  }

  get userInput() {
    return this.loginForm.value;
  }

  setLoginUserData() {
    this.httpService
      .post(this.loginForm.value, `/auth/login?captcha=false`)
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/user/my-profile');
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }

  checkCaptcha(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.loginForm.value.captcha = token;
    });
  }

  forgotPassword() {
    this.httpService
      .post({ email: this.loginForm.value.email }, '/auth/forgot-password')
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/auth/reset-password');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }

  socialLogin(){
    console.log('hii');

    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data) => {
        this.httpService.post({token: data.idToken},"/auth/login/google").subscribe({
          next: res => console.log(res),
          error: err => console.log(err)
        })
      });
  }
}

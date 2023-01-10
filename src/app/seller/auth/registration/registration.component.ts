import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { passwordValidator } from '../../../validators/custom-validators';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public userService: LocalstorageService,
    private httpService: HttpService,
    private router: Router,
  ) {}

  registrationForm!: FormGroup;
  errorMessage: any = undefined;


  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        name: new FormControl('', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
        company: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
        confirmpassword: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
        captcha: new FormControl(''),
      },
      { validator: passwordValidator('password', 'confirmpassword') }
    );
  }

  setRegduserData() {

    delete this.registrationForm.value['confirmpassword'];

    grecaptcha.ready(() => {
      grecaptcha
        .execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', {
          action: 'submit',
        })
        .then((token:any) => {
          this.registrationForm.value.captcha = token;
          console.log(this.registrationForm.value)
          this.httpService.post(this.registrationForm.value,'/auth/register').subscribe({
            next: (users: any) => {
              this.router.navigateByUrl('/seller/auth/login');
            },
            error: (err) => {
              this.errorMessage = err.error.message;
            },
          });
        });
    });
  }
}

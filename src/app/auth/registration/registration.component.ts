import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../localstorage.service';
import { passwordValidator } from '../../custom-validators';
import { HttpService } from 'src/app/http.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

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
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {}

  registrationForm!: FormGroup;
  url: string = '/auth/register?captcha=false';

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
        captcha: new FormControl('', [Validators.required]),
      },
      { validator: passwordValidator('password', 'confirmpassword') }
    );
  }

  setRegduserData() {
    delete this.registrationForm.value['confirmpassword'];

    this.httpService.set(this.registrationForm.value, this.url).subscribe({
      next: (users: any) => {
        this.router.navigateByUrl('/auth/login');
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  checkCaptcha(): void {
    this.recaptchaV3Service.execute('importantAction').subscribe( token => {
      this.registrationForm.value.captcha = token
      console.log(token)
    })
  }

}

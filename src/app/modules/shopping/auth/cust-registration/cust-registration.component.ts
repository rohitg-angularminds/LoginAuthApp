import { Component, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpService } from 'src/app/services/http.service';
import { passwordValidator } from '../../../../services/validators/custom-validators';

@Component({
  selector: 'app-cust-registration',
  templateUrl: './cust-registration.component.html',
  styleUrls: ['./cust-registration.component.scss'],
})
export class CustRegistrationComponent implements OnInit {
  constructor(
    private http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private toast: HotToastService
  ) {}

  customerRegstrationForm!: FormGroup;
  errorMessage!: any;

  ngOnInit(): void {
    this.customerRegstrationForm = this.fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        create_password: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
        address: new FormGroup({
          street: new FormControl(''),
          addressLine2: new FormControl(''),
          city: new FormControl(''),
          state: new FormControl(''),
          pin: new FormControl(''),
        }),
      },
      { validator: passwordValidator('create_password', 'password') }
    );
  }

  customerRegistration() {
    delete this.customerRegstrationForm.value?.create_password;

    this.http
      .post(this.customerRegstrationForm.value, '/shop/auth/register')
      .subscribe({
        next: (res) => {
          this.toast.success('registered successfully');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.toast.error(this.errorMessage);
        },
      });
  }
}

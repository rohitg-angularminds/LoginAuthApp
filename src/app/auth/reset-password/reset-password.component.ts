import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordValidator } from 'src/app/validators/custom-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {}

  resetPasswordForm!: FormGroup;
  passwordToken!: string;
  errorMessage! : string;

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group(
      {
        new_password: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      },
      { validator: passwordValidator('new_password', 'password') }
    );

    this.activatedRoute.queryParams.subscribe((params) => {
      this.passwordToken = params['token'];
    });
  }

  resetPassword() {
    delete this.resetPasswordForm.value['new_password'];
    console.log(this.resetPasswordForm.value);
    this.httpService
      .post(
        this.resetPasswordForm.value,
        `/auth/reset-password?token=${this.passwordToken}`
      )
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/auth/login');
        },
        error: (err) => {
            this.errorMessage = err.error.message;
        }
      });
  }
}

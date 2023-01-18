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
import { passwordValidator } from 'src/app/services/validators/custom-validators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public userService: LocalstorageService,
    public fb: FormBuilder,
    public httpService: HttpService,
    public router: Router,
  ) {}

  updateInfoForm!: FormGroup;
  changePasswordForm!: FormGroup;
  errorMessage : any;
  successMessage: any;

  ngOnInit(): void {
    const loggedUserdata = JSON.parse(this.userService.get('userDetails') || "")

    // update info form
    this.updateInfoForm = this.fb.group({
      email: new FormControl(loggedUserdata['_org']['email']),
      name: new FormControl(loggedUserdata['_org']['name'], [Validators.required]),
    });

    // change password form
    this.changePasswordForm = this.fb.group({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    }, {validator : passwordValidator('new_password', 'password')});
  }

  userLogout() {
    localStorage.clear();
    this.router.navigateByUrl('/seller/auth/login')
  }

  updateCompanyInfo() {
    this.httpService
      .patch(`/users/org`, this.updateInfoForm.value)
      .subscribe((data: any) => {
        console.log(data);
          this.router.navigateByUrl('/seller/my-profile')
      });
  }

  changePassword(){
    delete this.changePasswordForm.value.password

    this.httpService.post(this.changePasswordForm.value, '/users/auth/change-password').subscribe(
     {next: data => {
      this.successMessage = "password changed successfully"
      localStorage.clear();
      this.router.navigateByUrl('/seller/auth/login')
    },
      error: err => {
          this.errorMessage = err.error.message;
      }
    })
  }

}

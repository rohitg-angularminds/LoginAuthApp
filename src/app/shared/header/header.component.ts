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
import { passwordValidator } from 'src/app/validators/custom-validators';

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
  errorMessage : any = undefined;


  ngOnInit(): void {
    const loggedUserdata = JSON.parse(localStorage.getItem('userDetails') || "")

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
    this.userService.deleteUserToken();
    
  }

  updateCompanyInfo() {
    this.httpService
      .patch(`/users/org`, this.updateInfoForm.value)
      .subscribe((data: any) => {
          this.router.navigateByUrl('/seller/my-profile')
      });
  }

  changePassword(){
    this.httpService.post(this.changePasswordForm.value, '/users/auth/change-password').subscribe(
     {next: data => {
      console.log(data)
    },
      error: err => {
          this.errorMessage = err.error.message;
      }
    })
  }

}

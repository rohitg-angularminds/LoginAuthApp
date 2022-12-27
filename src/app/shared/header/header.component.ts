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

  ngOnInit(): void {
    // update info form
    this.updateInfoForm = this.fb.group({
      email: new FormControl(''),
      name: new FormControl('', [Validators.required]),
    });

    // change password form
    this.changePasswordForm = this.fb.group({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required]),
    });
  }

  userLogout() {
    this.userService.deleteUserToken();
  }

  updateCompanyInfo() {
    this.httpService
      .patch(`/users/org`, this.updateInfoForm.value)
      .subscribe((data: any) => {
          this.router.navigateByUrl('/user/my-profile')
      });
  }

  changePassword(){
    this.httpService.post(this.changePasswordForm.value, '/users/auth/change-password').subscribe(data => {
      console.log(data)
    })
  }

}

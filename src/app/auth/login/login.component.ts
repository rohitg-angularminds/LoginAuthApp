import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { LocalstorageService } from 'src/app/localstorage.service';

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
    public router: Router
  ) {}

  loginForm!: FormGroup;
  userInputStatus! : string;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get userInput() {
    return this.loginForm.value;
  }

  setLoginUserData(){
    this.httpService.setLoginUserData(this.loginForm.value).subscribe((data:any) => {
      this.userService.setUserToken(data.token);
      this.router.navigateByUrl('/my-profile')
    },(err) => {
      this.userInputStatus = err.error.message;
    })

  }


}

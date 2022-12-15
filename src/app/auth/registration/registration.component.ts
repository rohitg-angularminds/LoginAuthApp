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
    private router: Router
  ) {}

  registrationForm!: FormGroup;

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        email: new FormControl('jfkl@fkdlj.com', [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        name: new FormControl('fsdfds', [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*$'),
        ]),
        company: new FormControl('fsdfd', [Validators.required]),
        password: new FormControl('Rohit@111', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
        confirmpassword: new FormControl('Rohit@111', [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ]),
      },
      {validator : passwordValidator('password', 'confirmpassword')}
    );
  }

  setRegduserData(){
    delete this.registrationForm.value['confirmpassword'];

    this.httpService.setRegduserData(this.registrationForm.value).subscribe((data:any) => {
      this.router.navigateByUrl('/auth/login')
    }, (err) => {
      alert(err.error.message)
    })
  }
                                               
}

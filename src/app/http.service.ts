import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  profile = new Subject<any>();
  token = this.userService.getUserToken();

  constructor(
    private http: HttpClient,
    private userService: LocalstorageService
  ) {}

  getUserdata() {
    return this.http.get('https://shop-api.ngminds.com/auth/self');
  }

  setRegduserData(formData: any) {
    return this.http.post(
      'https://shop-api.ngminds.com/auth/register?captcha=fals',
      formData
    );
  }

  setLoginUserData(userDetails: any) {
    return this.http.post(
      'https://shop-api.ngminds.com/auth/login?captcha=false',
      userDetails
    );
  }

  setHeader: {} = { Authorization: `Bearer ${this.token}` };

  getProfileData() {
    this.http
      .get('https://shop-api.ngminds.com/auth/self', {
        headers: this.setHeader,
      })
      .subscribe((res: any) => {
        this.profile.next(res);
      });
  }
}

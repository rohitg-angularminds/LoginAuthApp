import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor(private userService: LocalstorageService, private router: Router) {}

  token!: string;
  header!: any;

   handleAuthError(err : any): Observable<any> {
      if(err.status === 401){
        this.userService.deleteUserToken();
        this.router.navigateByUrl('/auth/login')
      }
      return throwError(() =>  new Error(err.message));

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = this.userService.getUserToken() || '';
    this.header = { Authorization: `Bearer ${this.token}`};

    return next.handle(request.clone({setHeaders: this.header})).pipe(
      catchError(err => {
        return this.handleAuthError(err)
      }));
  }
}

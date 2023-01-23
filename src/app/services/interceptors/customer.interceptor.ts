import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';

@Injectable()
export class CustomerInterceptor implements HttpInterceptor {
  constructor(
    private userService: LocalstorageService,
    private router: Router
  ) {}

  token!: any;

  handleAuthError(err: any): Observable<any> {
    if (err.status === 401) {
      if (err.url.includes('.com/shop/auth') || err.url.includes('.com/customers')) {
        this.userService.delete('customerToken');
        this.router.navigateByUrl('/auth/login');
      } else {
        this.userService.delete('sellerToken');
        this.router.navigateByUrl('/seller/auth/login');
      }
    }
    throw err;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes('.com/shop') ||
      request.url.includes('.com/shop/auth') ||
      request.url.includes('.com/customers')
    ) {
      this.token = this.userService.get('customerToken');
    } else {
      this.token = this.userService.get('sellerToken');
    }

    const headers = { Authorization: `Bearer ${this.token}` };

    return next.handle(request.clone({ setHeaders: headers })).pipe(
      catchError((err) => {
        return this.handleAuthError(err);
      })
    );
  }
}

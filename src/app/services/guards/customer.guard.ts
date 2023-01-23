import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerProfileGuard implements CanActivate {
  constructor(private userService: LocalstorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.get('customerToken')) {
      return true;
    }

    this.router.navigateByUrl('/auth/login')
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CustomerLoginGuard implements CanActivate {
  constructor(private userService: LocalstorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userService.get('customerToken')) {
      return true;
    }

    this.router.navigateByUrl('/')
    return false;
  }
}

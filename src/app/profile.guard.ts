import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate,CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})


export class ProfileGuard implements  CanActivate {

  constructor(public router : Router, public userService : LocalstorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(this.userService.getUserToken()){
     return true

      }
      this.router.navigateByUrl('/auth/login');
      return false;

  }

}

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanActivate {
  constructor(private router: Router,public userService : LocalstorageService ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(!this.userService.getUserToken()){
        return true

      }
      this.router.navigateByUrl('/my-profile')
      return false;
  }
}

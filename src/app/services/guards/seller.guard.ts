import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate,CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})


export class SellerProfileGuard implements CanActivate {

  constructor(public router : Router, public userService : LocalstorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if(this.userService.get('sellerToken')){
     return true
      }
      this.router.navigateByUrl('/seller/auth/login');
      return false;
  }

}

@Injectable({
  providedIn: 'root'
})

export class SellerLoginGuard implements CanActivate {
  constructor(private router: Router,public userService : LocalstorageService ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(!this.userService.get('sellerToken')){
        return true
      }
      this.router.navigateByUrl('/seller/my-profile')
      return false;
  }
}

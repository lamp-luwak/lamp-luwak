import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class IsLoggedOutGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedOut();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  private checkLoggedOut(): boolean {
    const isLoggedOut: boolean = !this.authService.isLoggedIn;

    if (!isLoggedOut) {
      this.router.navigateByUrl('/');
    }

    return isLoggedOut;
  }

}

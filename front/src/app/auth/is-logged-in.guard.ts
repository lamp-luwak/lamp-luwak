import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, CanLoad,
  CanActivateChild, Router, NavigationExtras
} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class IsLoggedInGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const redirectUrl: string = state.url;
    return this.checkLoggedIn(redirectUrl);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const redirectUrl = document.location.pathname;
    return this.checkLoggedIn(redirectUrl);
  }

  private checkLoggedIn(redirectUrl: string): boolean {
    const isLoggedIn: boolean = this.authService.isLoggedIn;

    if (!isLoggedIn) {
      this.authService.redirectUrl = redirectUrl;
      this.router.navigateByUrl('/auth/login', <NavigationExtras>{ skipLocationChange: true });
    }

    return isLoggedIn;
  }
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {NavigationExtras, Router} from "@angular/router";
import {LocalStorage} from 'ngx-webstorage';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthService {

  @LocalStorage()
  isLoggedIn: boolean;

  redirectUrl: string;

  constructor(private router: Router) {}

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(() => this.isLoggedIn = true);
  }

  loginWithRedirect(): Promise<boolean> {
    return this.login().toPromise().then(() => {
      return this.router.navigateByUrl(this.redirectUrl || '/', <NavigationExtras>{ replaceUrl: true });
    });
  }

  logout(): Promise<boolean> {
    this.isLoggedIn = false;
    return this.router.navigateByUrl('/auth/login');
  }

}

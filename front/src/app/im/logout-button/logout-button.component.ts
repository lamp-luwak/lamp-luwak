import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'x-logout-button',
  template: `
    <a *ngIf="isLoggedIn" (click)="logout()">Logout</a>
  `,
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {

  constructor(private authService: AuthService) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn
  }

  logout() {
    this.authService.logout();
  }

}

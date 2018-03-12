import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {Title} from "@angular/platform-browser";

@Component({
  template: `    
    <form>
      <div>User name: <input></div>
      <div>Password: <input type="password"></div>
      <div>Confirm: <input type="password"></div>
      <div>
        <button (click)="createAccount($event)">Create an account</button>
        <a routerLink="/auth/login">Login</a>
      </div>
    </form>
  `,
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private authService: AuthService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Sign Up');
  }

  createAccount(event) {
    event.preventDefault();

    this.authService.loginWithRedirect();
  }

}

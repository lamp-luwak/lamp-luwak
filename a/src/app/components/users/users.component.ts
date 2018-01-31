import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-users',
  template: `
    <div class="table">
      <a routerLink="/user/{{user._id}}" class="row" *ngFor="let user of usersStream | async">
        <span>{{ user._id }}</span>
        <span>{{ user.username }}</span>
        <span>{{ user.email }}</span>
        <app-user-view-status [status]="user.status"></app-user-view-status>
        <app-user-view-registered [registeredTimestamp]="user.registeredTimestamp"></app-user-view-registered>
        <app-user-view-subscription-end 
          [subscriptionEndTimestamp]="user.subscriptionEndTimestamp"></app-user-view-subscription-end>
      </a>
    </div>
  `,
  styles: [`
    .table {
      display: table;
    }
    .row {
      display: table-row;
      text-decoration: none;
      color: black;
    }
    .row:nth-child(even) {
      background-color: #F2F2F2;
    }
    .row > * {
      display: table-cell;
      padding: 5px;
    }
  `]
})
export class UsersComponent implements OnInit {

  usersStream: Observable<Object[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersStream = this.usersService.getUsers();
  }

}

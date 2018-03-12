import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {IsLoggedOutGuard} from "./is-logged-out.guard";
import {CreateAccountComponent} from "./create-account/create-account.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ IsLoggedOutGuard ],
    canActivateChild: [ IsLoggedOutGuard ],
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', canActivate: [ IsLoggedOutGuard ], component: LoginComponent },
      { path: 'create-account', canActivate: [ IsLoggedOutGuard ], component: CreateAccountComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { IsLoggedInGuard } from './is-logged-in.guard';
import { IsLoggedOutGuard } from './is-logged-out.guard';
import { CreateAccountComponent } from './create-account/create-account.component';
import {BaseUiModule} from "../base-ui/base-ui.module";
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    BaseUiModule
  ],
  declarations: [LoginComponent, CreateAccountComponent, MainComponent],
  providers: [
    AuthService,
    IsLoggedInGuard,
    IsLoggedOutGuard
  ]
})
export class AuthModule { }

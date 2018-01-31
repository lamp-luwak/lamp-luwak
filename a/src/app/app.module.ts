import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app.component';
import { UsersComponent } from './components/users/users.component';
import {UsersService} from "./services/users.service";
import { UserComponent } from './components/user/user.component';
import { UserViewStatusComponent } from './components/user-view-status/user-view-status.component';
import { UserViewRegisteredComponent } from './components/user-view-registered/user-view-registered.component';
import { UserViewSubscriptionEndComponent } from './components/user-view-subscription-end/user-view-subscription-end.component';
import { TooltipDirective } from './components/tooltip/tooltip.directive';
import { UserViewAdditionalInfoComponent } from './components/user-view-additional-info/user-view-additional-info.component';
import { UserEditorAdditionalInfoComponent } from './components/user-editor-additional-info/user-editor-additional-info.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    UserViewStatusComponent,
    UserViewRegisteredComponent,
    UserViewSubscriptionEndComponent,
    TooltipDirective,
    UserViewAdditionalInfoComponent,
    UserEditorAdditionalInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

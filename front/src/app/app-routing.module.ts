import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsLoggedInGuard} from "./auth/is-logged-in.guard";

const routes: Routes = [
  { path: '', redirectTo: 'im', pathMatch: 'full' },
  {
    path: 'im',
    canLoad: [ IsLoggedInGuard ],
    loadChildren: 'app/im/im.module#ImModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import {NotFoundComponent} from "./not-found/not-found.component";
import {BaseUiModule} from "../base-ui/base-ui.module";

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    BaseUiModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }

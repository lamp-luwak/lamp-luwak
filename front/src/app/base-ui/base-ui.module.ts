import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TooltipComponent, TooltipSlotDirective} from "./tooltip/tooltip.component";
import {LayoutComponent, LayoutSlotDirective} from "./layout/layout.component";
import {RouterModule} from "@angular/router";
import { CenterComponent } from './center/center.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TooltipComponent,
    TooltipSlotDirective,
    LayoutComponent,
    LayoutSlotDirective,
    CenterComponent
  ],
  exports: [
    TooltipComponent,
    TooltipSlotDirective,
    LayoutComponent,
    LayoutSlotDirective,
    CenterComponent
  ]
})
export class BaseUiModule { }

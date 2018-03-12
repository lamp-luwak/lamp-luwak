import {Component, Directive} from '@angular/core';

@Directive({
  selector: '[x-tooltip-handler],[x-tooltip-content]'
})
export class TooltipSlotDirective {}

@Component({
  selector: 'x-tooltip',
  template: `    
    <div class="handler" (mouseenter)="open()" (mouseleave)="close()">
      <ng-content select="[x-tooltip-handler]"></ng-content>
    </div>
    <div class="content-placeholder">
      <div class="content" *ngIf="active">
        <ng-content select="[x-tooltip-content]"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  public active: boolean = false;

  public open(): void {
    this.active = true;
  }

  public close(): void {
    this.active = false;
  }

}

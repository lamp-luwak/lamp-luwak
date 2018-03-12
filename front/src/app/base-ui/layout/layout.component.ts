import {Component, Directive} from '@angular/core';

@Directive({
  selector: '[x-layout-header],[x-layout-content]'
})
export class LayoutSlotDirective {}

@Component({
  selector: 'x-layout',
  template: `
    <div class="header">
      <a routerLink="/" class="header-title">Sonata</a>
      <ng-content select="[x-layout-header]"></ng-content>
    </div>
    <ng-content select="[x-layout-content]"></ng-content>
    <div class="footer">
      <div class="footer-content">&copy; 2017</div>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

}

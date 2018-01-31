import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-view-registered',
  template: `
    <span
      [appTooltip]="registeredTimestamp">
      {{ registeredTimestamp | date }}
    </span>
  `,
  styles: []
})
export class UserViewRegisteredComponent {
  @Input() registeredTimestamp;
}

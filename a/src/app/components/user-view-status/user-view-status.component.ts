import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-view-status',
  template: `
    <span
      [class]="status">
      {{ status }}
    </span>
  `,
  styles: [`
    .active {
      color: green;
    }
    .suspended {
      color: gray;
    }
    .disabled {
      color: gray;
      text-decoration: line-through;
    }
  `]
})
export class UserViewStatusComponent {
  @Input() status;
}

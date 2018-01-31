import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-view-subscription-end',
  template: `
    <span
      [class.elapsed]="isElapsed()"
      [appTooltip]="subscriptionEndTimestamp">
        {{ subscriptionEndTimestamp | date }}
    </span>
  `,
  styles: [`
    .elapsed {
      opacity: .2;
    }
  `]
})
export class UserViewSubscriptionEndComponent {
  @Input() subscriptionEndTimestamp;

  isElapsed() {
    return Date.now() > this.subscriptionEndTimestamp;
  }
}

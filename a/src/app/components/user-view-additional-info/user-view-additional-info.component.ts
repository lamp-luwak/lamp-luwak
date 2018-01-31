import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-user-view-additional-info',
  template: `
    <pre>{{ additionalInfo | json }}</pre>
  `,
  styles: []
})
export class UserViewAdditionalInfoComponent {
  @Input() additionalInfo;
}

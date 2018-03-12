import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'x-profile',
  template: `
    <p>
      profile Works!
    </p>
  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

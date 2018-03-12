import { Component } from '@angular/core';

@Component({
  template: `
    <x-layout>
      <x-center x-layout-content>
        <router-outlet></router-outlet>
      </x-center>
    </x-layout>
  `,
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}

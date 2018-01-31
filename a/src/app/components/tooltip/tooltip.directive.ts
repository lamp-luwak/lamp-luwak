import {Directive, ElementRef, Input, Renderer2} from '@angular/core';
import * as tippy from 'tippy.js';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  constructor(
    private hostElement: ElementRef,
    private renderer : Renderer2
  ) {
    tippy(hostElement.nativeElement, {
      dynamicTitle: true
    });
  }

  @Input('appTooltip')
  set title(title: string) {
    this.renderer.setAttribute(this.hostElement.nativeElement, 'title', title);
  }

}

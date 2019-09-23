import { Input, Component, DoCheck, ElementRef } from '@angular/core';

@Component({
  selector: '<app-ghost-html></<app-ghost-html>',
  templateUrl: 'ghosthtml.component.html',
  inputs: ['NgIf', 'GhostHtmlDirective'],
  styleUrls: ['ghosthtml.component.scss']
})
export class GhostHtmlComponent implements DoCheck {
  /**
   *
   */
  @Input() html: string;
  constructor(private elementRef: ElementRef) {


  }

  ngDoCheck() {
    (this.elementRef.nativeElement as HTMLElement).outerHTML = this.html;
    console.log(this.html);
  }
}

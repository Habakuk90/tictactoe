import { Directive, Input, ViewContainerRef, ComponentFactory, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { IResponse } from 'src/app/shared/http/responseParams';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Location } from '@angular/common';
import { GhostHtmlComponent } from '../components/ghosthtml.component';
import { HtmlParser } from '@angular/compiler';



@Directive({
  selector: '[appGhostHtml]'
})
export class GhostHtmlDirective {
  constructor(public g: GhostService, public l: Location,
    private viewContainer: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  @Input('appGhostHtml') set html(post: IResponse) {
    let compFactory: ComponentFactory<GhostHtmlComponent>;

    compFactory = this.componentFactoryResolver.resolveComponentFactory(GhostHtmlComponent);
    this.viewContainer.clear();

    if (post) {
      const componentRef = this.viewContainer.createComponent(compFactory);
      (<GhostHtmlComponent>componentRef.instance).html = post.html;

      const parser = new DOMParser();
      const document = parser.parseFromString(post.html, 'text/html');
      componentRef.changeDetectorRef.markForCheck();
    }
  };
}

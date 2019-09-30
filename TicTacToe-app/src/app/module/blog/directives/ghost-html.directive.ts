import { Directive, Input, ViewContainerRef, ComponentFactoryResolver, TemplateRef, EmbeddedViewRef } from '@angular/core';
import { IResponse } from 'src/app/shared/http/responseParams';



@Directive({
  selector: '[appGhostHtml]'
})
export class GhostHtmlDirective {
  constructor(public templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  @Input('appGhostHtml') set html(post: IResponse) {
    let embeddedRef: EmbeddedViewRef<any>;
    this.viewContainer.clear();

    if (post) {
      embeddedRef = this.viewContainer.createEmbeddedView(this.templateRef);
      embeddedRef.rootNodes[0].outerHTML = post.html;

      embeddedRef.markForCheck();
    }
  };
}

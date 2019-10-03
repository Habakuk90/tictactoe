import { Directive, Input, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
import { IResponse } from 'src/app/shared/http/responseParams';

// deprecated: THIS IS ONLY LEFT HERE FOR REFERENCE PURPOSE

@Directive({
  selector: '[appGhostHtml]',

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

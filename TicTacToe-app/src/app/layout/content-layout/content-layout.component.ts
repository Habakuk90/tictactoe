import { Component, OnInit, ElementRef } from '@angular/core';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { INavigation, ITagsResponseParams } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  public navigation: INavigation[];
  public tags: ITagsResponseParams[]; // FIXME use ITagResponse instead of "params"
  constructor(private elementRef: ElementRef, private ghostService: GhostService) { }

  setBodyHeight(footerHeight) {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const container: HTMLElement = nativeElement.querySelector('.container');
    container.style.paddingBottom = footerHeight + 'px';
  }

  ngOnInit() {
    this.ghostService.getSettings().subscribe(settings => {
      this.navigation = settings.navigation;
    });

    const params: IBrowseOptions = {
      include: 'count.posts'
    };
    this.ghostService.getTags(params).subscribe(tags => {
      this.tags = tags.filter(tag => {
        return tag.count.posts > 0;
      });
    });
  }
}

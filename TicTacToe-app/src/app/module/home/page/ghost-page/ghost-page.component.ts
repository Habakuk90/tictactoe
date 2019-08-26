import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from 'src/app/shared/http/response';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ghost-page',
  templateUrl: './ghost-page.component.html'
})
export class GhostPageComponent implements OnInit {
  @Input() ghostPage: Observable<PageResponse>;

  @ViewChild('container', { static: false }) container: ElementRef;

  public title: string;

  // private _pageElements: IGhostElement[];
  constructor(private titleService: Title) {
    // this._pageElements = ghostService.getPageElements();
  }
  ngOnInit() {
    // TODOANDI use the root component to implement innerHTML
    this.ghostPage.toPromise().then(page => {

      const html = page.pages[0].html;
      this.title = page.pages[0].title;
      this.titleService.setTitle(this.title);
      console.log(page.pages);
      // this._pageElements = this.ghostService.getPageElements(html);
      this.container.nativeElement.innerHTML = html;
    });

  }
}

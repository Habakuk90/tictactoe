import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesResponeParams } from 'src/app/shared/http/response';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ghost-page',
  templateUrl: './ghost-page.component.html'
})
export class GhostPageComponent implements OnInit {
  @Input() ghostPage: Observable<PagesResponeParams>;

  @ViewChild('container', { static: false }) container: ElementRef;

  public title: string;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.ghostPage.subscribe(page => {
      const html = page.html;
      this.title = page.title;
      this.titleService.setTitle(this.title);
      this.container.nativeElement.innerHTML = html;
    });

  }
}

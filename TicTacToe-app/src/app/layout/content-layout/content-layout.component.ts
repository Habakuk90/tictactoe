import { Component, OnInit, ElementRef } from '@angular/core';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { ISettingsResponseParams } from 'src/app/shared/http/responseParams';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  public settings: ISettingsResponseParams;
  constructor(private elementRef: ElementRef, private ghostService: GhostService) {}

  setBodyHeight(footerHeight) {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const container: HTMLElement = nativeElement.querySelector('.container');
    container.style.paddingBottom = footerHeight + 'px';
  }

  ngOnInit() {
    this.ghostService.getSettings().subscribe(settings => {

      this.settings = settings;
    });
  }
}

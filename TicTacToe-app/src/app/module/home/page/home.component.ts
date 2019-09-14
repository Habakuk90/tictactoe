import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { IResponse } from 'src/app/shared/http/responseParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
  hub: HomeHubConnection;
  ghostPage: IResponse;
  title: string;
  @ViewChild('home', {static: false}) home: ElementRef;
  constructor(
    private userService: UserService,
    private ghost: GhostService) {
  }

  public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    const that = this;
    this.ghost.getPage('home').subscribe(pages => {
      const page = pages[0];

      (that.home.nativeElement as HTMLElement).outerHTML = page.html;
      that.title = page.title;
    });
  }

  ngOnDestroy() {
  }

  registerOnMethods() {
  }
}

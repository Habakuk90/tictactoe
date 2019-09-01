import { Component, OnDestroy, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { IPageResponseParams } from 'src/app/shared/http/response';
import { GhostService } from 'src/app/shared/services/ghost.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
  hub: HomeHubConnection;
  ghostPage: IPageResponseParams;
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
      (this.home.nativeElement as HTMLElement).outerHTML = pages[0].html;
      this.title = pages[0].title;
    });
  }

  ngOnDestroy() {
  }

  registerOnMethods() {
  }
}

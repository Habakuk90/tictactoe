import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
  hub: HomeHubConnection;
  page: IResponse;
  title: string;


  constructor(
    private userService: UserService,
    private ghost: GhostService) {
  }

  public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    const that = this;

    const options: IBrowseOptions = {
      filter: `tag:${'styleguide'}`,
      formats: 'html,plaintext'
    };

    this.ghost.getPage(options).subscribe(pages => {
      that.page = pages[0];

      that.title = that.page.title;
    });
  }

  ngOnDestroy() {
  }

  registerOnMethods() {
  }
}

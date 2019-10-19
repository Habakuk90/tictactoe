import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';
import { Observable, Subscription } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HubFactory } from 'src/app/connections/hub.factory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
  hub: HomeHubConnection;
  page: IResponse;
  title: string;
  protected slug$: Observable<string>;

  constructor(
    private userService: UserService,
    private ghost: GhostService,
    private route: ActivatedRoute) {
  }

  public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    this.hub = new HubFactory('name').createConnection(HomeHubConnection);

    // fix me, have to call it in every HubComponent
    this.registerOnMethods();
    this.hub.isConnected.subscribe(isConnected => {
      if (isConnected) {
        this.hub.sendAll('got options');
      }
    });

    this.slug$ = this.route.paramMap.pipe(map(params => (params.get('slug'))));
    this.slug$.pipe(take(1)).subscribe(slug => this.get(slug));

  }
  get(slug: string): void {
    const that = this;

    const options: IBrowseOptions = {
      filter: `tag:${'styleguide'}`,
      formats: 'html,plaintext'
    };

    this.ghost.getPages(options).subscribe(pages => {
      that.page = pages[0];

      that.title = that.page.title;
    });
  }

  ngOnDestroy() {
    // fix me, have to call it in every HubComponent
    this.hub.stopConnection();
  }

  registerOnMethods() {
    this.hub.onSendMessage(y => console.log(y));
  }
}

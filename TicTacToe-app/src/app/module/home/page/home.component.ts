import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { HubComponent } from 'src/app/connections/base.hubconnection';
import { HomeHubConnection } from 'src/app/connections/home.hubconnection';
import { GhostService } from 'src/app/shared/services/ghost.service';
import { IResponse } from 'src/app/shared/http/responseParams';
import { IBrowseOptions } from 'src/app/shared/http/browseParams';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { GameHubConnection } from 'src/app/connections/game.hubconnection';
import { HubService } from 'src/app/connections/hub.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, HubComponent {
  hub: GameHubConnection;
  page: IResponse;
  title: string;
  protected slug$: Observable<string>;

  constructor(
    private userService: UserService,
    private ghost: GhostService,
    private hubService: HubService,
    private route: ActivatedRoute) {
  }

  public get userName() { return this.userService.currentUserName; }

  ngOnInit() {
    this.slug$ = this.route.paramMap.pipe(map(params => (params.get('slug'))));
    this.slug$.pipe(take(1)).subscribe(slug => this.get(slug));
    this.hub = this.hubService.createConnection('gameh', 'gamehub', GameHubConnection);
    var that = this;
    this.registerOnMethods();
  }
  get(slug: string): void {
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
    this.hub.isConnected.subscribe(x => {
      if (x) {
        this.hub.hello('eh joaaa').then(y => console.log(y));
      }
    });

  }
}

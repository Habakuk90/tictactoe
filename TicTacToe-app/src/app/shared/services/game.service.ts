import { Injectable } from "@angular/core";
import { HubConnectionService } from "./hubconnection.service";
import { ModalService } from "../modals/modal.service";
import { GameHubConnection } from "../connections/game.hubconnection";
import { Hub } from "../connections/base.hubconnection";

@Injectable()
export class GameService {
  // homeState = this._HomeStateSubject.asObservable();
  hub: Hub<GameHubConnection>;

  constructor(
    public connectionService: HubConnectionService<GameHubConnection>,
    public modalService: ModalService
  ) {
    const hub = new GameHubConnection(
      connectionService.buildConnection("/tictactoe"),
      "gamehub"
    );
    // this.connectionService._connectionBehaviour.next(false);
    this.connectionService.createHubConnection(hub).then(x => {
      this.hub = x;
      this.connectionService._connectionBehaviour.next(true);
    });
  }

  public startGame(groupName: string) {
    let promise: Promise<string>;

    this.connectionService.isConnected.subscribe(isConnected => {
      if (isConnected) {
        promise = this.hub.connection.invoke("StartGame", groupName);
      }
    });

    return promise;
  }
}

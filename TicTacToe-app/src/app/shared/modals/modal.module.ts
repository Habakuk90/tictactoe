import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ChallengedModalComponent } from './challenged/modal.challenged.component';
import { WaitingModalComponent } from './waiting/modal.waiting.challenged.component';
import { SharedModule } from '../modules/shared.module';
import { ModalService } from './modal.service';
import { DeclinedModalComponent } from './declined/modal.declined.component';
import { GameOverModalComponent } from './gameOver/modal.gameover.challenged.component';



@NgModule({
  imports: [ SharedModule ],
  declarations: [ModalComponent,
    ChallengedModalComponent,
    WaitingModalComponent,
    DeclinedModalComponent,
    GameOverModalComponent
  ],
  providers: [ModalService],
  exports: [ModalComponent]
})
export class ModalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal.component';
import { ChallengedModalComponent } from './challenged/modal.challenged.component';
import { WaitingModalComponent } from './waiting/modal.waiting.challenged.component';
import { SharedModule } from '../modules/shared.module';



@NgModule({
  imports: [ SharedModule ],
  declarations: [ModalComponent, ChallengedModalComponent, WaitingModalComponent],
  providers: [],
  exports: [ModalComponent]
})
export class ModalModule { }

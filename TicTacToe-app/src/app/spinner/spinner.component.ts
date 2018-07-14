import { Component } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  showSpinner: boolean;
  showSpinnerSubscription: Subscription;
  constructor(spinnerService: SpinnerService) {
    this.showSpinnerSubscription =
      spinnerService.showSpinner.subscribe(show => this.showSpinner = show);
  }
}

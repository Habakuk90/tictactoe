import { OnInit, OnDestroy, Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.scss']
})
export class RPSComponent implements OnInit, OnDestroy {
  @ViewChild('rock', {read: ElementRef}) rockElement: ElementRef;
  @ViewChild('paper', {read: ElementRef}) paperElement: ElementRef;
  @ViewChild('scissors', {read: ElementRef}) scissorsElement: ElementRef;

  selectTile(event, rock) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

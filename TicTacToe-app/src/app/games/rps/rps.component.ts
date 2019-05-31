import { OnInit, OnDestroy, Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.scss']
})
export class RPSComponent implements OnInit, OnDestroy {
  @ViewChild('rock', {static: false, read: ElementRef}) rockElement: ElementRef;
  @ViewChild('paper', {static: false, read: ElementRef}) paperElement: ElementRef;
  @ViewChild('scissors', {static: false, read: ElementRef}) scissorsElement: ElementRef;

  selectTile(event) {
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }
}

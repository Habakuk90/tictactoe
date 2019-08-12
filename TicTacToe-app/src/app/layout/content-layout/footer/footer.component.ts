import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Output() changeTheme: EventEmitter<boolean> = new EventEmitter<boolean>();

  year = new Date().getFullYear();
  version = 2;
  envName = environment;
  isDarkTheme: Observable<boolean>;

    constructor() { }

  ngOnInit(): void {
    // this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean) {
    this.changeTheme.emit(checked);
  }
}

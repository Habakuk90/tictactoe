import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  // private overlayContainer: OverlayContainer;
  theme = 'my-light-theme';
  isDarkTheme: Observable<boolean>;

  // constructor(private themeService: ThemeService) {}

  ngOnInit() {
  }
}

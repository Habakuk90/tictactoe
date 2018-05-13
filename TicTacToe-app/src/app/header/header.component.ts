import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userName: string;
  isLoggedIn: boolean;
  constructor(private userService: UserService) {
    this.isLoggedIn = userService.isLoggedIn();
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
  }
}

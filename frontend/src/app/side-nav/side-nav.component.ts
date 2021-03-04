import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { 
    this.userService.user$.subscribe( u => {
      this.user = u;
    })
  }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout();
  }
}

import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hysk-homepage';
  user: User;

  constructor(private userService: UserService) {

    this.userService.user$.subscribe(
      u => {
        this.user = u;
      }
    )
  }
}

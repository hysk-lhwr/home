import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('scrollToTopBtn', {static: false}) scrollToTopBtn: ElementRef;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(
      u => {
        this.user = u;
      }
    )
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const verticalOffset = window.pageYOffset 
    || document.documentElement.scrollTop 
    || document.body.scrollTop || 0;

    if(verticalOffset > 600) {
      this.scrollToTopBtn.nativeElement.classList.add('showBtn');
    } else {
      this.scrollToTopBtn.nativeElement.classList.remove('showBtn');
    }
  }

  navExternal(url: string): void {
    window.open(url, "_blank");
  }

  toTop(): void {
    window.scroll(0,0);
  }
}

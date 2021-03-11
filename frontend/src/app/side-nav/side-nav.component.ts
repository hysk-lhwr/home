import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SideNavList } from '../models/side-nav-list/side-nav-list';
import { User } from '../models/user';
import { NavListService } from '../service/nav-list.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  user: User;
  navList: SideNavList;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService, private navService: NavListService) {

    this.userService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe( u => {
      this.user = u;
    })

    this.navService.navList$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      n => {
        this.navList = n;
      }
    )
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  logout(): void {
    this.userService.logout();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SideNavItem } from '../models/side-nav-list/side-nav-item';
import { SideNavList } from '../models/side-nav-list/side-nav-list';
import { User } from '../models/user';
import { ConstantsService } from '../service/constants.service';
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
  iconPath = this.constants.iconPath;
  showSearch: boolean = false;
  iconColor = {
    home: this.constants.iconColor.regular,
    login: this.constants.iconColor.regular,
    logout: this.constants.iconColor.regular,
    new: this.constants.iconColor.regular,
    next: this.constants.iconColor.regular,
    previous: this.constants.iconColor.regular,
    search: this.constants.iconColor.regular,
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService, private navService: NavListService, private constants: ConstantsService, private router: Router) {

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

  navigate(navItem: SideNavItem) {
    this.navService.resetList();
    this.router.navigateByUrl(navItem.navUrl, {state: navItem.state})
  }

  logout(): void {
    this.userService.logout();
  }

  hoverIcon(key: string): void {
    this.iconColor[key] = this.constants.iconColor.highlight;
  }

  hoverEnds(key: string): void {
    this.iconColor[key] = this.constants.iconColor.regular;
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { navListDefault, navItemHome, navItemLogin, navItemNew } from "../models/side-nav-list/nav-constants";
import { SideNavList } from "../models/side-nav-list/side-nav-list";

@Injectable({
    providedIn: 'root'
})
export class NavListService {
    private navList: SideNavList = navListDefault;
    private navListSubject: BehaviorSubject<SideNavList> = new BehaviorSubject<SideNavList>(this.navList);
    public navList$ = this.navListSubject.asObservable();

    constructor() { }

    public setNavList(newList: SideNavList) {
        this.navList = newList;
        this.navListSubject.next(this.navList);
    }

    public resetList() {
        const defaultList = {
            navItems: [navItemHome, navItemNew],
        }
        this.navList = defaultList;
        this.navListSubject.next(this.navList);
    }
}
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { navListDefault } from "../models/side-nav-list/nav-constants";
import { SideNavList } from "../models/side-nav-list/side-nav-list";

@Injectable({
    providedIn: 'root'
})
export class NavListService {
    private navList: SideNavList = navListDefault;
    private navListSubject: BehaviorSubject<SideNavList> = new BehaviorSubject<SideNavList>(this.navList);
    public navList$ = this.navListSubject.asObservable();

    public setNavList(newList: SideNavList) {
        this.navList = newList;
        this.navListSubject.next(this.navList);
    }
}
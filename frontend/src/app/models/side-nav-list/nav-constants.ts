import { SideNavItem } from "./side-nav-item";
import { SideNavList } from "./side-nav-list";

export const navItemHome: SideNavItem = {
    name: 'Home',
    navUrl: '/',
    iconUrl: '',
}

export const navItemLogin: SideNavItem = {
    name: 'login',
    navUrl: '/login',
    iconUrl: '',
}

export const navItemNew: SideNavItem = {
    name: 'new',
    navUrl: '/new',
    iconUrl: '',
}

export const navListDefault: SideNavList = {
    navItems: [navItemHome, navItemLogin, navItemNew],
}
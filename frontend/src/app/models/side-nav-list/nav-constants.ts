import { SideNavItem } from "./side-nav-item";
import { SideNavList } from "./side-nav-list";

export const navItemHome: SideNavItem = {
    name: 'Home',
    navUrl: '/',
    iconUrl: '',
    requireLogin: false,
}

export const navItemLogin: SideNavItem = {
    name: 'login',
    navUrl: '/login',
    iconUrl: '',
    requireLogin: false,
}

export const navItemNew: SideNavItem = {
    name: 'new',
    navUrl: '/new',
    iconUrl: '',
    requireLogin: true,
}

export const navListDefault: SideNavList = {
    navItems: [navItemHome, navItemLogin, navItemNew],
}
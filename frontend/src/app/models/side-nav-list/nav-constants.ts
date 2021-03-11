import { SideNavItem } from "./side-nav-item";
import { SideNavList } from "./side-nav-list";

export const navItemHome: SideNavItem = {
    name: 'home',
    navUrl: '/',
    iconName: 'home',
    requireLogin: false,
}

export const navItemLogin: SideNavItem = {
    name: 'login',
    navUrl: '/login',
    iconName: 'login',
    requireLogin: false,
}

export const navItemNew: SideNavItem = {
    name: 'new',
    navUrl: '/new',
    iconName: 'new',
    requireLogin: true,
}

export const navListDefault: SideNavList = {
    navItems: [navItemHome, navItemLogin, navItemNew],
}
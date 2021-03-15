import { SideNavItem } from "./side-nav-item";
import { SideNavList } from "./side-nav-list";

export const navItemHome: SideNavItem = {
    name: 'home',
    navUrl: '/',
    iconName: 'home',
    requireLogin: false,
    state: null,
}

export const navItemLogin: SideNavItem = {
    name: 'login',
    navUrl: '/login',
    iconName: 'login',
    requireLogin: false,
    state: null,
}

export const navItemNew: SideNavItem = {
    name: 'new',
    navUrl: '/new',
    iconName: 'new',
    requireLogin: true,
    state: null,
}

export const navItemArticles: SideNavItem = {
    name: 'articles',
    navUrl: '/articles',
    iconName: '',
    requireLogin: false,
    state: null,
}

export const navItemProjects: SideNavItem = {
    name: 'projects',
    navUrl: '/projects',
    iconName: '',
    requireLogin: false,
    state: null,
}

export const navListDefault: SideNavList = {
    navItems: [navItemHome, navItemNew],
}
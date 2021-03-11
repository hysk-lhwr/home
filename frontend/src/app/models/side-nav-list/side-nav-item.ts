export interface SideNavItem {
    name: string; // name of item to be displayed
    navUrl: string; // url from root
    iconUrl: string; // icon url 
    requireLogin: boolean; // if true, only shows if user is logged in
}
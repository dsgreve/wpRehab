import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".nav-header");
        this.events();
    }

    events() {
        this.menuIcon.click(this.toggleMenuIcon);
        this.menuIcon.click(this.toggleTheMenu.bind(this));  
    }

    toggleTheMenu() {
        this.menuContent.toggleClass("nav-header--is-visible");
        this.menuIcon.toggleClass("site-header__menu-icon--is-active");
        
    }

}

export default MobileMenu;
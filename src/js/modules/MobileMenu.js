
class MobileMenu {
    constructor() {

        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".nav-header");
        this.events();
    }

    events() {
        this.menuIcon.addEventListener("click", () => this.toggleTheMenu());
    }

    toggleTheMenu() {
        this.menuContent.classList.toggle("nav-header--is-visible");
        this.menuIcon.classList.toggle("site-header__menu-icon--is-active");
        
    }

}

export default MobileMenu;
export class Burger{
    constructor(burgerClassName, MenuClassName){
        this.menu = document.querySelector(MenuClassName);
        this.burger = document.querySelector(burgerClassName);
        this.shadow = document.querySelector('.burger-background');
        this.isMenuOpen = false;
        this.menuWidth = this.menu?.clientWidth;
        this.burgerActiveClass=`${burgerClassName.slice(1)}-active`;
    }

    handleClickOnBurger(){
        if(this.isMenuOpen){
            this.closeMenu();
            return;
        }
        this.openMenu();
    }

    openMenu(){
        this.isMenuOpen = true;
        this.menu.style.right='0px';
        this.shadow.classList.add('burger-background-show')
        this.changeBurgerButton(this.isMenuOpen)
        document.body.style.overflow="hidden";
    };
    
    closeMenu(){
        this.isMenuOpen = false;
        this.menu.style.right=-this.menuWidth +'px';
        this.shadow.classList.remove('burger-background-show')
        this.changeBurgerButton(this.isMenuOpen)
        document.body.style.overflow="auto";
    };

    changeBurgerButton(isToOpen) {
        let fun;
        if(isToOpen){
            fun = "add";
        } else{
            fun = "remove";
        }
        this.burger.classList[fun](this.burgerActiveClass);
    }
}
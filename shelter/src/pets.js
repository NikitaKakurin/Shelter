import './css/pets.scss'
import {Burger} from './js/burger'

window.addEventListener('load', ()=>{
    const burger = new Burger('.pets-burger-button','.pets-menu');
    burger.closeMenu()
    document.addEventListener('click', handleClick)

    function handleClick(event){
        const target = event.target;
        if(target.closest('.burger-button')){
            burger.handleClickOnBurger();
            return;
        }
        if(target.classList.contains('burger-background')||
            target.classList.contains('pets-menu__link')){
            burger.closeMenu();
            return;
        }     
    }
})
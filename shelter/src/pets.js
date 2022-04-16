import './css/pets.scss'
import {Burger} from './js/burger'

window.addEventListener('load', ()=>{
    const burger = new Burger('.pets-burger-button','.pets-menu');
    burger.closeMenu()
    document.addEventListener('click', handleClick)

    function handleClick(event){
        const target = event.target;
        if(event.target.closest('.burger-button')){
            burger.handleClickOnBurger();
            return;
        }else{
            if(burger.isMenuOpen){
                burger.closeMenu();
            }
        }
    }
})
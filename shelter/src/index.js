import './css/main.scss';
import {Burger} from './js/burger'

window.addEventListener('load', ()=>{
    const burger = new Burger('.burger-button','.menu');
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
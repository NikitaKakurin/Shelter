import './css/pets.scss';
import {Burger} from './js/burger';
import {Popup} from './js/mainPopup';


window.addEventListener('load', ()=>{
    const burger = new Burger('.pets-burger-button','.pets-menu');
    const popup = new Popup('.popup');
    burger.closeMenu();
    document.addEventListener('click', handleClick);

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

        if(target.closest('.slider__item')){
            let id = target.closest('.slider__item').dataset.id
            popup.show(id)
            return;
        }
        if(target.classList.contains('popup-active')||
           target.classList.contains('popup__button')){
            popup.hide()
            return;
        }
    }
})
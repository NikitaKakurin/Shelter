import './css/pets.scss';
import {Burger} from './js/burger';
import {Popup} from './js/mainPopup';
import {generate48Pets, makeSlider, slideMoveNext, slideMovePrev} from './js/pagination';


window.addEventListener('load', ()=>{
    const burger = new Burger('.pets-burger-button','.pets-menu');
    const popup = new Popup('.popup');
    burger.closeMenu();
    document.addEventListener('click', handleClick);
    generate48Pets();
    makeSlider();
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
        
        if(target.classList.contains('pagination__next')){
            slideMoveNext();            
            return;
        };
        
        if(target.classList.contains('pagination__prev')){
            slideMovePrev();
            return;
        }

        if(target.classList.contains('pagination__end')){
            slideMoveNext('end');            
            return;
        };
        
        if(target.classList.contains('pagination__begin')){
            slideMovePrev('begin');
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
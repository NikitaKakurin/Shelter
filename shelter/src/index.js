import './css/main.scss';
import {Burger} from './js/burger';
import {makeSlider, slideMoveNext, slideMovePrev} from './js/mainSlider';
import {Popup} from './js/mainPopup';



window.addEventListener('load', ()=>{
    const burger = new Burger('.burger-button','.menu');
    const popup = new Popup('.popup')
    burger.closeMenu();
    document.addEventListener('click', handleClick);
    makeSlider();

    function handleClick(event){
        const target = event.target;
        if(event.target.closest('.burger-button')){
            burger.handleClickOnBurger();
            return;
        }
        if(target.classList.contains('burger-background')||
            target.classList.contains('menu__link')){
            burger.closeMenu();
            return;
        }

        if(target.classList.contains('slider__arrow-next')){
            slideMoveNext();            
            return;
        };
        
        if(target.classList.contains('slider__arrow-prev')){
            slideMovePrev();
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
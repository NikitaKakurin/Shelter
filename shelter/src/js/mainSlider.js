import { ALL_PETS } from "./allPets";
import {createCard, createOneElement} from "./commonFunctions";
const CARDS_CONTAINER = document.querySelector('.slider__items_container');
const CARDS_WRAPPERS_CONTAINER = CARDS_CONTAINER.querySelector('.slider__wrappers_container');
const CARDS_WRAPPERS = CARDS_WRAPPERS_CONTAINER.querySelectorAll('.slider__items_wrapper');

let busyCardsNumbers = [];
let activeCardsNumbers = [];
let isSlideMove = false;

export function makeSlider(){
    changeTargetCardsWrappers(1)
}

export function slideMoveNext() {
    if(isSlideMove){
        return;
    }
    isSlideMove = true;
    changeTargetCardsWrappers(2)
    CARDS_WRAPPERS_CONTAINER.classList.add('main-transition-right');
    CARDS_WRAPPERS_CONTAINER.addEventListener('animationend', finishSlidersAnimation,{'once':true});
}

export function slideMovePrev() {
    if(isSlideMove){
        return;
    }
    isSlideMove = true;
    changeTargetCardsWrappers(0)
    CARDS_WRAPPERS_CONTAINER.classList.add('main-transition-left');
    CARDS_WRAPPERS_CONTAINER.addEventListener('animationend', finishSlidersAnimation,{'once':true});
}

function finishSlidersAnimation(event) {
    if(event.animationName === 'main-move-left'){
        CARDS_WRAPPERS_CONTAINER.classList.remove('main-transition-left');
        changeActiveCardsWrappers(0);
    }else{
        CARDS_WRAPPERS_CONTAINER.classList.remove('main-transition-right');
        changeActiveCardsWrappers(2)        
    }
    isSlideMove = false;
}

function changeActiveCardsWrappers(target) {
    CARDS_WRAPPERS[1].innerHTML =  CARDS_WRAPPERS[target].innerHTML;
    busyCardsNumbers = [...CARDS_WRAPPERS[1].querySelectorAll('.slider__item')]
            .map(elem=>elem.dataset.id)
    activeCardsNumbers = [...busyCardsNumbers]
}

function changeTargetCardsWrappers(target) {
    CARDS_WRAPPERS[target].innerHTML="";
    if(window.innerWidth>=1280){
        CARDS_WRAPPERS[target].append(createCard(...ChooseRandomCard(3)),
            createCard(...ChooseRandomCard(3)),
            createCard(...ChooseRandomCard(3)));
        return;
    }
    if(window.innerWidth<1280 && window.innerWidth>=678){
        CARDS_WRAPPERS[target].append(createCard(...ChooseRandomCard(2)),
            createCard(...ChooseRandomCard(2)));
        return;
    }
    if(window.innerWidth<678){
        CARDS_WRAPPERS[target].append(createCard(...ChooseRandomCard(1)));
        return;
    }
}

function ChooseRandomCard(size){
    if(busyCardsNumbers.length>=size*2){
        busyCardsNumbers = busyCardsNumbers.slice(size);
    }
    let freeNumbers = ALL_PETS.filter(item=>!busyCardsNumbers.includes(item.id))
    let randomNumber = Math.floor(Math.random()*freeNumbers.length);
    busyCardsNumbers.push(freeNumbers[randomNumber].id);
    return  [freeNumbers[randomNumber].name, freeNumbers[randomNumber].img, freeNumbers[randomNumber].id ];
}



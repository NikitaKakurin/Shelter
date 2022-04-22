import { allPets } from "./allPets";
const cardsContainer = document.querySelector('.slider__items_container');
const cardsWrappersContainer = cardsContainer.querySelector('.slider__wrappers_container');
const cardsWrappers = cardsWrappersContainer.querySelectorAll('.slider__items_wrapper');

let busyCardsNumbers = [];
let ActiveCardsNumbers = [];
let isSlideMove = false;

export function makeSlider(){
    if(window.innerWidth>=1280){
        cardsWrappers.forEach(elem=>{
            elem.append(createCard(...ChooseRandomCard(3)),
            createCard(...ChooseRandomCard(3)),
            createCard(...ChooseRandomCard(3)));
        })
        return;
    }
    if(window.innerWidth<1280 && window.innerWidth>=678){
        cardsWrappers.forEach(elem=>{
            elem.append(createCard(...ChooseRandomCard(2)),
            createCard(...ChooseRandomCard(2)));
        })
        return;
    }
    if(window.innerWidth<678){
        cardsWrappers.forEach(elem=>{
            elem.append(createCard(...ChooseRandomCard(1)));
        })
        return;
    }
}

export function slideMoveNext() {
    if(isSlideMove){
        return;
    }
    isSlideMove = true;
    changeTargetCardsWrappers(2)
    cardsWrappersContainer.classList.add('main-transition-right');
    cardsWrappersContainer.addEventListener('animationend', finishSlidersAnimation,{'once':true});
}

export function slideMovePrev() {
    if(isSlideMove){
        return;
    }
    isSlideMove = true;
    changeTargetCardsWrappers(0)
    cardsWrappersContainer.classList.add('main-transition-left');
    cardsWrappersContainer.addEventListener('animationend', finishSlidersAnimation,{'once':true});
}

function finishSlidersAnimation(event) {
    if(event.animationName === 'main-move-left'){
        cardsWrappersContainer.classList.remove('main-transition-left');
        changeActiveCardsWrappers(0);
    }else{
        cardsWrappersContainer.classList.remove('main-transition-right');
        changeActiveCardsWrappers(2)        
    }
    isSlideMove = false;
}

function changeActiveCardsWrappers(target) {
    cardsWrappers[1].innerHTML =  cardsWrappers[target].innerHTML;
    busyCardsNumbers = [...cardsWrappers[1].querySelectorAll('.slider__item')]
            .map(elem=>elem.dataset.id)
    ActiveCardsNumbers = [...busyCardsNumbers]
}

function changeTargetCardsWrappers(target) {
    cardsWrappers[target].innerHTML="";
    if(window.innerWidth>=1280){
        cardsWrappers[target].append(createCard(...ChooseRandomCard(3)),
            createCard(...ChooseRandomCard(3)),
            createCard(...ChooseRandomCard(3)));
        return;
    }
    if(window.innerWidth<1280 && window.innerWidth>=678){
        cardsWrappers[target].append(createCard(...ChooseRandomCard(2)),
            createCard(...ChooseRandomCard(2)));
        return;
    }
    if(window.innerWidth<678){
        cardsWrappers[target].append(createCard(...ChooseRandomCard(1)));
        return;
    }
}

function ChooseRandomCard(size){
    if(busyCardsNumbers.length>=size*2){
        busyCardsNumbers = busyCardsNumbers.slice(size);
    }
    let freeNumbers = allPets.filter(item=>!busyCardsNumbers.includes(item.id))
    let randomNumber = Math.floor(Math.random()*freeNumbers.length);
    busyCardsNumbers.push(freeNumbers[randomNumber].id);
    return  [freeNumbers[randomNumber].name, freeNumbers[randomNumber].img, freeNumbers[randomNumber].id ];
}


function createCard(petsName, imageSrc, id){
    const FIGURE = createOneElement('figure', 'slider__item');
    FIGURE.dataset.id = `${id}`;

    const IMAGE = createOneElement('img','slider__item_img');
    IMAGE.width = '270';
    IMAGE.height = '270';
    IMAGE.alt = petsName;
    IMAGE.src = imageSrc;

    const FIGCAPTION = createOneElement('figcaption', 'slider__item_figcaption')

    const TITLE = createOneElement('h3','slider__item_title');
    TITLE.innerText = petsName;

    const BUTTON = createOneElement('button', ['slider__item_button', 'button', 'button-light']);
    BUTTON.innerText='Learn more';
    FIGCAPTION.append(TITLE,BUTTON);
    FIGURE.append(IMAGE,FIGCAPTION)
    return FIGURE;
}

function createOneElement(tag, className){
    const ELEMENT = document.createElement(tag);
    if(Array.isArray(className)){
        className.forEach(classItem=>{
            ELEMENT.classList.add(classItem);
        })
    }else{
        ELEMENT.classList.add(className);
    }
    return ELEMENT;
}
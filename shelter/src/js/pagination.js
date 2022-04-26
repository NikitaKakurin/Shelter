import { allPets } from "./allPets";
const arrayPages=[]
const cardsContainer = document.querySelector('.pets-slider__items_container');
const cardsWrappersContainer = cardsContainer.querySelector('.pets-slider__wrappers_container');
const cardsWrappers = cardsWrappersContainer.querySelectorAll('.pets-slider__items_wrapper');
const page = document.querySelector('.pagination__page');
const next = document.querySelector('.pagination__next');
const prev = document.querySelector('.pagination__prev');
const begin = document.querySelector('.pagination__begin');
const end = document.querySelector('.pagination__end');

let isSlideMove=false;
export function generate48Pets(){
    let size;
    let count;
    if(window.innerWidth>=1280){
        size = 8;
        count = 6;
    }else if(window.innerWidth<1280 && window.innerWidth>=768){
        size = 6;
        count = 8;
    }else if(window.innerWidth<768){
        size = 3;
        count = 16;
    }
    let firstNumber;
    let index;
    let numbersArray = [0,1,2,3,4,5,6,7];

    for(let i=0; i<count; i++){
        arrayPages[i]=[];
    }
    for(let i=0; i<count; i++){
        let additionalArr = []
        if(i===0){
            firstNumber = Math.floor(Math.random()*8);
        }
            numbersArray = [...numbersArray.slice(firstNumber), ...numbersArray.slice(0,firstNumber)];
        for(index = 0; index<size; index++){
            let randomIndex = Math.floor(Math.random()*size);
            while(additionalArr[randomIndex] !== undefined){
                randomIndex = Math.floor(Math.random()*size);
            }
            additionalArr[randomIndex] = numbersArray[index]
        }
        if(arrayPages.some((arr)=>arr.join('') === additionalArr.join(''))){
            i--;
            firstNumber = 0;
        }else{
            arrayPages[i] = additionalArr;
            firstNumber = index;
        }
        
    }
    console.log(arrayPages)
}

export function makeSlider(){
    changeTargetCardsWrappers(1, 1)
}

function changeTargetCardsWrappers(target, page) {
    cardsWrappers[target].innerHTML="";
    let fragment = document.createDocumentFragment();
    for(let num of arrayPages[page-1]){
        fragment.append(createCard(allPets[num].name,
                                     allPets[num].img,
                                     allPets[num].id));
    }
    cardsWrappers[target].append(fragment)
}

export function slideMoveNext(target) {
    if(isSlideMove){
        return;
    }

    isSlideMove = true;
    let nextPage;

    if(target==='end'){
        nextPage = arrayPages.length;
    }else{
        nextPage = +page.innerText+1;
    }

    page.innerText = nextPage
    changeTargetCardsWrappers(2, nextPage)
    cardsWrappersContainer.classList.add('pets-transition-right');
    cardsWrappersContainer.addEventListener('animationend', finishSlidersAnimation,{'once':true});
}

export function slideMovePrev(target) {
    if(isSlideMove){
        return;
    }

    isSlideMove = true;
    let prevPage;

    if(target==='begin'){
        prevPage = 1;
    }else{
        prevPage = +page.innerText-1;
    }

    page.innerText = prevPage;
    changeTargetCardsWrappers(0, prevPage)
    cardsWrappersContainer.classList.add('pets-transition-left');
    cardsWrappersContainer.addEventListener('animationend', finishSlidersAnimation,{'once':true});
}

function finishSlidersAnimation(event) {
    if(event.animationName === 'pets-move-left'){
        cardsWrappersContainer.classList.remove('pets-transition-left');
        changeActiveCardsWrappers(0);
    }else{
        cardsWrappersContainer.classList.remove('pets-transition-right');
        changeActiveCardsWrappers(2)        
    }

    if(+page.innerText===arrayPages.length){
        next.disabled=true;
        end.disabled=true;
    }else{
        next.disabled=false;
        end.disabled=false;
    }

    if(+page.innerText===1){
        prev.disabled=true;
        begin.disabled=true;
    }else{
        prev.disabled=false;
        begin.disabled=false;
    }

    isSlideMove = false;
}

function changeActiveCardsWrappers(target) {
    cardsWrappers[1].innerHTML =  cardsWrappers[target].innerHTML;
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
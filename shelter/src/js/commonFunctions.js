export function createCard(petsName, imageSrc, id){
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

export function createOneElement(tag, className){
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
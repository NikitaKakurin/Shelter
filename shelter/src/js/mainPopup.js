import {ALL_PETS} from './allPets';
export class Popup{
    constructor(selector){
        this.popup = document.querySelector(selector);
        this.container = this.popup.querySelector('.popup__container');
    }

    createContent(id){
        this.fragment = document.createDocumentFragment();
        const PETS_OBJ = ALL_PETS[id];
        if(window.innerWidth>=768){
            const IMAGE = this.createOneElement('img', 'popup__img');
            IMAGE.alt = PETS_OBJ.name;
            IMAGE.src = PETS_OBJ.img;            
            this.fragment.append(IMAGE);
        }

        const CONTENT = this.createOneElement('div', 'popup__content');
        const TITLE = this.createOneElement('div', 'popup__title');
        TITLE.innerText = PETS_OBJ.name;
        const TYPE = this.createOneElement('div', 'popup__type');
        TYPE.innerText = `${PETS_OBJ.type} - ${PETS_OBJ.breed}`;
        const TEXT = this.createOneElement('div', 'popup__text');
        TEXT.innerText = PETS_OBJ.description;
        CONTENT.append(TITLE, TYPE, TEXT);
        const LIST = this.createOneElement('ul', 'popup__characteristic');

        for (let index = 0; index < 4; index++) {
            let item = this.createOneElement('li', 'popup__characteristic_item');
            let name = this.createOneElement('span', 'popup__characteristic_name');
            let text = this.createOneElement('span', 'popup__characteristic_text');
            switch (index) {
                case 0:
                    name.innerText = "Age:"
                    text.innerText = PETS_OBJ.age;
                    break;
                case 1:
                    name.innerText = "Inoculations:"
                    text.innerText = PETS_OBJ.inoculations.join(', ');
                    break;
                case 2:
                    name.innerText = "Diseases:"
                    text.innerText = PETS_OBJ.diseases.join(', ');
                    break;
                case 3:
                    name.innerText = "Parasites:"
                    text.innerText = PETS_OBJ.parasites.join(', ');
                    break;
            }
            item.append(name, text);
            LIST.append(item);
        }
        CONTENT.append(LIST);
        this.fragment.append(CONTENT);
        this.container.append(this.fragment)
    }

    show(id){
        this.createContent(id)
        this.popup.classList.add('popup-active')
        document.body.style.overflow = 'hidden';
    }

    hide(){
        this.container.innerHTML = "";
        this.popup.classList.remove('popup-active')
        document.body.style.overflow = 'auto';
    }

    createOneElement(tag, className){
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
}
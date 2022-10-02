import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {showModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModalWindow('.modal', modalTimerId), 3000);

    tabs('.tabheader__item', '.tabcontent' , '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-09-31');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        currentCounter: '#current',
        prevArrow: '.offer__slider-prev',
        totalCurrent: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});

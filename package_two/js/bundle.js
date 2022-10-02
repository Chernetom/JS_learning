/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
    //Calc
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = '1.375';

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex ='female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings ('#gender div', 'calculating__choose-item_active');
    initLocalSettings ('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = '____';
            return;
        }
        
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) +  (3.1 * height) - (4.3 * age)) * ratio);
        }else {
            result.textContent = Math.round((88.36 + (13.4 * weight) +  (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                }else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
            }
            calcTotal();
        });
        
    }
    getDinamicInformation ('#height');
    getDinamicInformation ('#weight');
    getDinamicInformation ('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards () {
    //class
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.chagedUSD();
            
        }

        chagedUSD() {
            this.price = this.price * this.transfer;
        }

        verst() {
            const elem = document.createElement('div');
            if(this.classes.length === 0) {
                this.classes = "menu__item";
                elem.classList.add(this.classes);
            } else {
                this.classes.forEach(className => elem.classList.add(className));
            }
            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(elem);
        }
    }
    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, alting, title, descr, price}) => {
                new MenuCard(img, alting, title, descr, price, ".menu .container").verst();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms (formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);
    const message = {
            loading: 'img/form/spinner.svg',
            success: 'Успешно',
            failure: 'Что-то пошло не так'
            };

    forms.forEach((item) => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display:block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const previousModalDiolog = document.querySelector('.modal__dialog');

        previousModalDiolog.style = 'display:none';
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModalWindow)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDiolog.style = 'display:block';
            previousModalDiolog.style = 'dispaly:none';
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal');
        }, 4000);
    }

    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModalWindow": () => (/* binding */ showModalWindow)
/* harmony export */ });
function showModalWindow (modalSelector, modalTimerId) {
    let classModal = document.querySelector(modalSelector);
    classModal.style = "display: block";
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', (e) => {
                if(e.code === 'Escape'){
                    closeModalWindow();
                }
            });
    if (modalTimerId){
    clearInterval(modalTimerId);
    }
}

function closeModalWindow (modalSelector) {
    let classModal = document.querySelector(modalSelector);
    classModal.style = 'display: none';
    document.body.style.overflow = '';
}


function modal (trigerSelector, modalSelector, modalTimerId ) {
    //modal
    const modalButton = document.querySelectorAll(trigerSelector);
    let classModal = document.querySelector(modalSelector);

    modalButton.forEach( (item) => {
        item.addEventListener('click', () => showModalWindow(modalSelector, modalTimerId));
    });
    
    classModal.addEventListener('click', (e) => {
        if(e.target === classModal || e.target.getAttribute('data-close') == ''){
            closeModalWindow(modalSelector);
        }
    });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prevArrow, totalCurrent, currentCounter, wrapper, field}) {
        //slides
        const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        numberCurrentSlider = document.querySelector(currentCounter),
        totalNumberslides = document.querySelector(totalCurrent),
        nextSlider = document.querySelector(nextArrow),
        previewSlider = document.querySelector(prevArrow),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
      totalNumberslides.textContent = `0${slides.length}`;
      numberCurrentSlider.textContent = `0${slideIndex}`;
      }else {
          totalNumberslides.textContent = slides.length;
          numberCurrentSlider.textContent = slideIndex;
      }
  

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  slidesWrapper.style.overflow = 'hidden';

  slides.forEach((slide) => {
      slide.style.width = width;
  }); 

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
      if (i == 0 ){
          dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
  }

  function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
  }

  nextSlider.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)){
          offset = 0;
      } else {
          offset += deleteNotDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
          slideIndex = 1;
      }else {
          slideIndex++;
      }

      if (slides.length < 10) {
          numberCurrentSlider.textContent = `0${slideIndex}`;
      }else {
          numberCurrentSlider.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;
      
  });

  previewSlider.addEventListener('click', () => {
      if (offset == 0){
          offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
          offset -= deleteNotDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
          slideIndex = slides.length;
      }else {
          slideIndex--;
      }

      if (slides.length < 10) {
          numberCurrentSlider.textContent = `0${slideIndex}`;
      }else {
          numberCurrentSlider.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = deleteNotDigits(width) * (slideTo - 1);

          slidesField.style.transform = `translateX(-${offset}px)`;

          if (slides.length < 10) {
              numberCurrentSlider.textContent = `0${slideIndex}`;
          }else {
              numberCurrentSlider.textContent = slideIndex;
          }

          dots.forEach(dot => dot.style.opacity = '.5');
          dots[slideIndex - 1].style.opacity = 1;
      });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //switch tabs
    let tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabsContentSelector),
        tabHeader = document.querySelector(tabsParentSelector);
  
    function hideTabContent(){
        tabContent.forEach( item => {
            item.style.display = 'none';
        });
        tabs.forEach( item => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent(i) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent(0);
    tabHeader.addEventListener('click', function (e) {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) =>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline) {
    //timer
    function getDataTimer(endtime){
        const timer = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(timer / (1000 * 60 * 60 * 24)),
                hours = Math.floor((timer / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((timer / (1000 * 60) % 60)),
                seconds = Math.floor((timer / 1000) % 60);
        return {
            'total': timer,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num > 0 && num < 10){
            return `0${num}`;
        }else {
            return num;
        }
    }

    function setDataTimer(selector, endtime){
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateDataTimer, 1000);
        
        updateDataTimer();

        function updateDataTimer(){
            const timer = getDataTimer(endtime);

            days.innerHTML = getZero(timer.days);
            hours.innerHTML = getZero(timer.hours);
            minutes.innerHTML = getZero(timer.minutes);
            seconds.innerHTML = getZero(timer.seconds);

            if (timer.total <= 0){
                clearInterval( timeInterval);
            }

        }
    }

    setDataTimer(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"},
        body: data
    });

    return await res.json();
};


async function getResource(url) {
    let res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModalWindow)('.modal', modalTimerId), 3000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent' , '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-09-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
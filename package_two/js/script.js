'use strict';
window.addEventListener('DOMContentLoaded', () => {
    //switch tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabHeader = document.querySelector('.tabheader__items'),
          tabContent = document.querySelectorAll('.tabcontent');
    
    function hideTabContent(){
        tabContent.forEach( item => {
            item.style.display = 'none';
        });
        tabs.forEach( item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i) {
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent(0);
    tabHeader.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) =>{
                if (target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //timer
    const deadline = '2022-09-31';
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

    setDataTimer('.timer', deadline);

    //modal

    const modalButton = document.querySelectorAll('[data-modal]');
    let classModal = document.querySelector('.modal');

    
    function showModalWindow () {
        classModal.style = "display: block";
                document.body.style.overflow = 'hidden';
                document.addEventListener('keydown', (e) => {
                    if(e.code === 'Escape'){
                        closeModalWindow();
                    }
                });
        clearInterval(modalTimerId);
    }
    modalButton.forEach( (item) => {
        item.addEventListener('click', showModalWindow);
    });
    
    function closeModalWindow () {
        classModal.style = 'display: none';
        document.body.style.overflow = '';
    }

    
    classModal.addEventListener('click', (e) => {
        if(e.target === classModal || e.target.getAttribute('data-close') == ''){
            closeModalWindow();
        }
    });

    const modalTimerId = setTimeout(showModalWindow, 3000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
  
    window.addEventListener('scroll', showModalByScroll);

    //class
    class MenuCard {
        constructor(src, alt, title,  descr, price, parentselector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentselector);
            this.transfer = 27;
            this.chagedUSD();
            
        }

        chagedUSD() {
            this.price = this.price * this.transfer;
        }

        verst() {
            const elem = document.createElement('div');
            if(this.classes.length == 0) {
                this.element = 'menu__item';
                elem.classList.add(this.element);
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

    const getResource = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, alting, title, descr, price}) => {
            new MenuCard(img, alting, title, descr, price, 'menu .container').render();
        });
    });
    //Forms

    const forms = document.querySelectorAll('form');
    const message = {
            loading: 'img/form/spinner.svg',
            success: 'Успешно',
            failure: 'Что-то пошло не так'
          };

    forms.forEach((item) => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"},
            body: data
        });

        return await res.json();
    };


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display:block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            
            postData('http://localhost:3000/requests', json)
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
        showModalWindow();

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
            closeModalWindow();
        }, 4000);
    }

    fetch('db.json')
        .then(data => data.json())
        .then(res => console.log(res));

    //slides
    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          numberCurrentSlider = document.querySelector('#current'),
          totalNumberslides = document.querySelector('#total'),
          nextSlider = document.querySelector('.offer__slider-next'),
          previewSlider = document.querySelector('.offer__slider-prev'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
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

    nextSlider.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)){
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
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
            offset = +width.replace(/\D/g, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
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
            offset = +width.replace(/\D/g, '') * (slideTo - 1);

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

});

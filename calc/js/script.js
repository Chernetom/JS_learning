'use strict';

const inpRub = document.querySelector('#rub'),
      outUsd = document.querySelector('#usd');

inpRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'aplication/json; charset = utf-8');
    request.send();

    request.addEventListener('readystatechange', () => {
        if(request.status == 200 && request.readyState == 4) {
            console.log(request.response);
            console.log(inpRub.value);
            const data = JSON.parse(request.response);
            outUsd.value = (+inpRub.value / data.current.usd).toFixed(2);
        } else {
            outUsd.value ="Ошибка";
        }
    });
});
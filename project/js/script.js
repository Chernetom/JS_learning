/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


const promoBlocks = document.querySelectorAll('.promo__adv img'),
      promoGenere = document.querySelector('.promo__bg .promo__genre'),
      promoBackground = document.querySelector('.promo__bg'),
      promoList = document.querySelector('.promo__interactive-list');


promoBlocks.forEach(function (item)  {
    item.remove();
});

promoGenere.textContent = "драма";
promoBackground.style.backgroundImage = "url('img/bg.jpg')";
promoList.innerHTML = "";

movieDB.movies.sort();
movieDB.movies.forEach((film, i) => {
    promoList.innerHTML += `
    <li class="promo__interactive-item"> ${i+1} ${film}
        <div class="delete"></div>
    </li>
    `;
});

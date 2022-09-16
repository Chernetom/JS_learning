/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () =>{
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
          promoList = document.querySelector('.promo__interactive-list'),
          addMovieButton = document.querySelector('.add button'),
          addForm = document.querySelector('.add'),
          FormInput = document.querySelector('.add .adding__input'),
          checkboxForm = document.querySelector('[type="checkbox"]');

          addForm.addEventListener('submit', function (e){
            e.preventDefault();
            let newFilm = FormInput.value;
            if(newFilm){

                if(newFilm.length > 21){
                    newFilm = `${newFilm.substring(0, 22)}...`;
                }
                movieDB.movies.push(newFilm);
                sortText(movieDB.movies);
                fillMovieList(movieDB.movies, promoList);
            }
            const favoriteFilm = checkboxForm.checked;
            if(favoriteFilm){
                console.log("Добавляем любимый фильм");
            }
            e.target.reset();
          });
    
    
    promoBlocks.forEach(function (item)  {
        item.remove();
    });
    
    promoGenere.textContent = "драма";
    promoBackground.style.backgroundImage = "url('img/bg.jpg')";
    const sortText = function(arr){
        arr.sort();
    };
    sortText(movieDB.movies);
    function fillMovieList(filmL, parent){
        parent.innerHTML = "";
        sortText(filmL);
       filmL.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item"> ${i+1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });
        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () =>{
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                fillMovieList(movieDB.movies, promoList);
            });
        });
    }
    fillMovieList(movieDB.movies, promoList);
});

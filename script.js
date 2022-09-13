'use strict';
const personalMovieDB ={
    count:0,
    movies:{},
    actors:{},
    genres:[],
    privat:false,
    start: function(){
        personalMovieDB.count = +prompt('Сколько фильмов вы посмотрели?', '');
        while (personalMovieDB.count == '' || null || isNaN(personalMovieDB.count)){
            personalMovieDB.count = +prompt('Сколько фильмов вы посмотрели?', '');
        }
    },
    detectKinoScore: function(){
        if (personalMovieDB.count < 10){
            alert('Просмотренно довольно мало фильмов');
        }else if(personalMovieDB.count >= 10 && personalMovieDB.count < 30){
            alert('Вы классический зритель');
        }else if(personalMovieDB.count >= 30){
            alert('Вы киноман');
        }else {
           alert('Произошла ошибка');
        }
    },
    rememberMyFilms: function(){
        for(let i = 0; i < 2; i++){
            const a = prompt('Какой последний фильм вы смотрели?',''),
                  b = prompt('Сколько звёзд ему поставите?','');
            if(a!= null && b!=null && a!= '' && b!='' && a.length<50){
               personalMovieDB.movies[a] = b;
            } else{
               i--;
            }
       }
    },
    showMyDB: function(){
        if (personalMovieDB.privat == false){
            console.log(personalMovieDB);
        }
    },
    writeYourGenres:function(){
        for(let i = 0; i < 3; i++){
            personalMovieDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i+1}`);
            if (personalMovieDB.genres == '' || null || !isNaN(personalMovieDB.genres)) {
                i--;
            }
        }
        personalMovieDB.genres.forEach(function(item, i){
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        }
        );
    },
    toggleVisibleMyDB: function(){
        if(personalMovieDB.privat == false){
            personalMovieDB.privat= true;
        }else{
            personalMovieDB.privat= false;
        }
    }
};
personalMovieDB.toggleVisibleMyDB();
console.log('1');
personalMovieDB.showMyDB();
personalMovieDB.toggleVisibleMyDB();
console.log('2');
personalMovieDB.showMyDB();
personalMovieDB.writeYourGenres();
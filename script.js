let numbersOfFilms;

function start(){
    numbersOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');
    while (numbersOfFilms == '' || null || isNaN(numbersOfFilms)){
        numbersOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');
    }
}
start();
const personalMovieDB ={
    count:numbersOfFilms,
    movies:{},
    actors:{},
    genres:[],
    privat:false
};

function detectKinoScore(){
    if (personalMovieDB.count < 10){
        alert('Просмотренно довольно мало фильмов');
    }else if(personalMovieDB.count >= 10 && personalMovieDB.count < 30){
        alert('Вы классический зритель');
    }else if(personalMovieDB.count >= 30){
        alert('Вы киноман');
    }else {
       alert('Произошла ошибка');
    }
}
detectKinoScore();

function rememberMyFilms(){
    for(let i = 0; i < 2; i++){
        const a = prompt('Какой последний фильм вы смотрели?',''),
              b = prompt('Сколько звёзд ему поставите?','');
        if(a!= null && b!=null && a!= '' && b!='' && a.length<50){
           personalMovieDB.movies[a] = b;
        } else{
           i--;
        }
   }
}
rememberMyFilms();

function showMyDB(){
    if (personalMovieDB.privat == false){
        console.log(personalMovieDB);
    }
}
showMyDB();

function writeYourGenres(){
    for(let i = 0; i < 3; i++){
        personalMovieDB.genres[i] = 
        prompt(`Ваш любимый жанр под номером ${i+1}`);
        if (personalMovieDB.genres == 
            '' || null || !isNaN(personalMovieDB.genres)) {
            i--;
        }
    }
}
writeYourGenres();
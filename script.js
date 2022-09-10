const numbersOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');

const personalMovieDB ={
    count:numbersOfFilms,
    movies:{},
    actors:{},
    genres:[],
    privat:false
};

if (personalMovieDB.count < 10){
    alert("Просмотренно довольно мало фильмов");
}else if(personalMovieDB.count >= 10 && personalMovieDB.count < 30){
    alert("Вы классический зритель");
}else if(personalMovieDB.count >= 30){
    alert("Вы киноман");
}else {
   alert("Произошла ошибка");
}

for(let i = 0; i < numbersOfFilms; i++){
     const a = prompt('Какой последний фильм вы смотрели?',''),
           b = prompt('Сколько звёзд ему поставите?','');
     if(a!= null && b!=null && a!= '' && b!='' && a.length<50){
        personalMovieDB.movies[a] = b;
     } else{
        i--;
     }
}

console.log(personalMovieDB);
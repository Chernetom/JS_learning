const numbersOfFilms = +prompt('Сколько фильмов вы посмотрели?', '');

const personalMovieDB ={
    count:numbersOfFilms,
    movies:{},
    actors:{},
    genres:[],
    privat:false
};

const aF = prompt('Какой последний фильм вы смотрели?',''),
      aFs = prompt('Сколько звёзд ему поставите?',''),
      aS = prompt('Какой последний фильм вы смотрели?',''),
      aSf = prompt('Сколько звёзд ему поставите?','');

personalMovieDB.movies[aF] = aFs;
personalMovieDB.movies[aS] = aSf;

console.log(personalMovieDB);


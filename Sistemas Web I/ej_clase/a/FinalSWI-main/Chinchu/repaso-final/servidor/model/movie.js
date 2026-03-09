const Movie = class Movie {
    constructor(id, name, year, rating, imdbScore, imdbUrl, plot, runtime, genres) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.rating = rating;
        this.imdbScore = imdbScore;
        this.imdbUrl = imdbUrl;
        this.plot = plot;
        this.runtime = runtime;
        this.genres = genres;
    }

    rate(score) {
        this.userScore = score;
    }
};

module.exports = Movie;
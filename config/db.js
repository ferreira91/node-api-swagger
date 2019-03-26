'use strict';

var crypto = require('crypto');

module.exports = function() {
    return {
        movieList: [],

        save(movie) {
            movie.id = crypto.randomBytes(20).toString('hex');
            this.movieList.push(movie);
            return true;
        },

        find(id) {
            if (id) {
                return this.movieList.find(element => {
                    // compare valeu and type
                    return element.id === id;
                });
            } else {
                return this.movieList;
            }
        },

        remove(id) {
            var found = false;
            this.movieList = this.movieList.filter(element => {
                if (element.id === id) {
                    found = true;
                } else {
                    return element.id !== id; 
                }
            });
        },

        update (id, movie) {
            var movieIndex = this.movieList.findIndex(element => {
                return element.id === id;
            });

            if (movieIndex !== -1) {
                this.movieList[movieIndex].title = movie.title;
                this.movieList[movieIndex].year = movie.year;

                return true;
            } else {
                return false;
            }
         }
    }
}
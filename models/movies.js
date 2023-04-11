const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = new Schema(
  {
    title: String,
    gender: String,
    image: String,
    categorie: String,
    yearMovies: String,
  },
  { collection: 'movies' }
);
const Movie = mongoose.model('movies', moviesSchema);
module.exports = Movie;
import React from 'react';
import MoviesList from './MoviesList';

const MyMovies = props => {
  return (
    <section className="border--medium">
      <h1 className="title--medium">Hola estas son tus MOVIES</h1>
      <MoviesList movies={props.movies} />
    </section>
  );
};

export default MyMovies;

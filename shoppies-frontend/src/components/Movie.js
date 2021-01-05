import React from 'react';

import classnames from 'classnames';

export default function Movie(props) {
  console.log(props);
  const movieInfoClass = classnames('movie__info', {
    'movie__info--explicit': props.collectionExplicitness === 'explicit',
  });

  return (
    <article className="movie">
      <img className="movie__thumbnail" src={props.Poster} alt="Movie" />
      <div className={movieInfoClass}>
        <div className="movie__name">{props.Title}</div>
        <div className="movie__artist">{props.artistName}</div>
      </div>
    </article>
  );
}

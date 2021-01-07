import React from 'react';
import classnames from 'classnames';

export default function Nomination(props) {
  const movieInfoClass = classnames('movie__info', {
    'movie__info--explicit': props.collectionExplicitness === 'explicit',
  });

  const handleClick = () => {
    props.deleteNomination(props.index);
  };

  return (
    <article className="nomination">
      <img className="movie__thumbnail" src={props.Poster} alt="Movie" />
      <div className={movieInfoClass}>
        <div className="movie__name">{props.Title}</div>
        <div className="movie__year">{props.Year}</div>
        <div>
          <button className="nominate__btn" onClick={handleClick}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

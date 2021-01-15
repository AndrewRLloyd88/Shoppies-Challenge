import React from 'react';
import classnames from 'classnames';
import filmThumbnail from '../images/filmdefault.png';

export default function Movie(props) {
  const movieInfoClass = classnames('movie__info', {
    'movie__info--explicit': props.collectionExplicitness === 'explicit',
  });

  const isNominated = () => {
    for (const nomination of props.nominations) {
      if (
        props.Title === nomination.movie_title &&
        props.Year === nomination.movie_year
      ) {
        return true;
      }
    }
    return false;
  };

  const handleClick = () => {
    props.addNomination(props);
  };

  return (
    <article className="movie" key={props.id}>
      <img
        className="movie__thumbnail"
        src={props.Poster === 'N/A' ? filmThumbnail : props.Poster}
        alt="Movie"
      />
      <div className={movieInfoClass}>
        <div className="movie__name">{props.Title}</div>
        <div className="movie__year">{props.Year}</div>
        {props.numNominated !== 5 ? (
          <div>
            {isNominated() ? (
              <p className="nominated_label">Nominated</p>
            ) : (
              <button className="nominate__btn" onClick={handleClick}>
                Nominate
              </button>
            )}
          </div>
        ) : (
          <div>
            {isNominated() ? (
              <p className="nominated_label">Nominated</p>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

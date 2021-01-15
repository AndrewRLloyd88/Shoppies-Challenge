import React from 'react';
import classnames from 'classnames';
import axios from 'axios';
import filmThumbnail from '../images/filmdefault.png';

export default function Nomination(props) {
  const movieInfoClass = classnames('movie__info', {
    'movie__info--explicit': props.collectionExplicitness === 'explicit',
  });

  const handleClick = () => {
    axios
      .delete(
        `api/movies/${props.id}`,
        {},
        {
          headers: {
            authorization: `Token token=${localStorage.getItem(
              'access_token'
            )}`,
          },
        }
      )
      .then(() => {
        props.deleteNomination();
      });
  };

  return (
    <article className="nomination">
      <img
        className="movie__thumbnail"
        src={props.movie_poster === 'N/A' ? filmThumbnail : props.movie_poster}
        alt="Movie"
      />
      <div className={movieInfoClass}>
        <div className="movie__name">{props.movie_title}</div>
        <div className="movie__year">{props.movie_year}</div>
        <div>
          <button className="nominate__btn" onClick={handleClick}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

import React from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import filmThumbnail from '../images/filmdefault.png';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#00e676',
    height: '40px',
    '&:hover': {
      backgroundColor: 'rgb(0, 161, 82)',
    },
  },
}));

export default function Movie(props) {
  const movieInfoClass = classnames('movie__info', {
    'movie__info--explicit': props.collectionExplicitness === 'explicit',
  });
  const classes = useStyles();

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
              <Button
                className={classes.button}
                onClick={handleClick}
                startIcon={<AddCircleIcon />}
              >
                Nominate
              </Button>
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

import React from 'react';
import classnames from 'classnames';
import axios from 'axios';
import filmThumbnail from '../images/filmdefault.png';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: '40px',
  },
}));

export default function Nomination(props) {
  const movieInfoClass = classnames('movie__info', {
    'movie__info--explicit': props.collectionExplicitness === 'explicit',
  });
  const classes = useStyles();

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
          <Button
            className={classes.button}
            onClick={handleClick}
            variant="contained"
            color="secondary"
            startIcon={<RemoveCircleIcon />}
          >
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}

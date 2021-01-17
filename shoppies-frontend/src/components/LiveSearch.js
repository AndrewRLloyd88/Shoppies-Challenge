import React, { Fragment, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Results from './Results';
import Nominations from './Nominations';
import CompleteBanner from './CompleteBanner';
import uuid from 'react-uuid';
import status from '../images/status.png';

export default function LiveSearch(props) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const numNominated = nominations.length;
  const userID = props.user.user.id;

  const getNominations = () => {
    axios
      .get('/api/movies', {
        headers: {
          authorization: `Token token=${localStorage.getItem('access_token')}`,
        },
      })
      .then((result) => {
        setNominations([...result.data]);
      });
  };

  //delete nominations by index from the array
  const deleteNomination = useCallback(() => {
    getNominations();
  }, []);

  //for when a user wants to add a nomination
  const addNomination = useCallback((movie) => {
    const movieNomination = {
      movie_title: movie.Title,
      movie_year: movie.Year,
      movie_poster: movie.Poster,
    };

    const user = {
      userID: userID,
    };

    axios
      .post(
        '/api/movies',
        {
          movieNomination,
          user,
        },
        {
          headers: {
            authorization: `Token token=${localStorage.getItem(
              'access_token'
            )}`,
          },
        }
      )
      .then(() => {
        getNominations();
      });
  }, []);

  useEffect(() => {
    getNominations();
    if (numNominated === 5) {
      setOpen(true);
    }
  }, [numNominated, deleteNomination, addNomination]);

  const handleClose = () => {
    setOpen(false);
  };

  //triggers on term changing
  useEffect(() => {
    if (term) {
      setIsSearching(true);
    }
    const mainURL = `https://www.omdbapi.com/?s=${term}&type=movie&page=1&apikey=${process.env.REACT_APP_API_KEY}`;

    const fallbackURL = `https://www.omdbapi.com/?t=${term}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`;

    axios.get(mainURL).then((response) => {
      if (response.data.Response === 'True') {
        setResults([...response.data.Search]);
        setIsSearching(false);
      } else if (response.data.Response === 'False') {
        axios.get(fallbackURL).then((response) => {
          if (response.data.Response === 'True') {
            setResults([response.data]);
            setIsSearching(false);
          } else {
            setResults([]);
            setIsSearching(false);
          }
        });
      }
    });
  }, [term]);

  return (
    <>
      <header className="logo">
        <img className="branding" src="images/shoppiesbrand.png" alt="Brand" />
        <SearchBar key={'searchbar'} onSearch={(term) => setTerm(term)} />
        {isSearching && (
          <div className="searching">
            <p>Searching...</p>
            <img className="spinner" src={status}></img>
          </div>
        )}
        <CompleteBanner
          open={open}
          numNominated={numNominated}
          handleClose={handleClose}
          user={props.user}
        />
      </header>

      <main>
        <div className="main-container">
          <div className="results-container">
            {term !== '' ? (
              <p className="col-title">
                Your search for {term} returned {results.length}{' '}
                {results.length > 1 ? 'results' : 'result'}:
              </p>
            ) : null}
            <Results
              key={uuid()}
              results={results}
              addNomination={addNomination}
              nominations={nominations}
              numNominated={numNominated}
            />
          </div>
          <div className="results-container">
            <p className="col-title">Your Nominations:</p>
            <Nominations
              key={uuid()}
              nominations={nominations}
              deleteNomination={deleteNomination}
            />
          </div>
        </div>
      </main>
    </>
  );
}

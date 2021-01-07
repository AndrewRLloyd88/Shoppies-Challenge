import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Results from './Results';
import Nominations from './Nominations';

export default function LiveSearch(props) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  //for when a user wants to add a nomination
  const addNomination = (movie) => {
    const newNomination = {
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
    };
    setNominations((prevNominations) => {
      return [...prevNominations, newNomination];
    });
  };

  //delete nominations by index from the array
  function deleteNomination(id) {
    setNominations((prevNominations) => {
      return prevNominations.filter((nomination, index) => {
        return index !== id;
      });
    });
  }

  //triggers on term changing
  useEffect(() => {
    const mainURL = `http://www.omdbapi.com/?s=${term}&type=movie&page=1&apikey=${process.env.REACT_APP_API_KEY}`;

    const fallbackURL = `http://www.omdbapi.com/?t=${term}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`;

    axios.get(mainURL).then((response) => {
      if (response.data.Response === 'True') {
        setResults([...response.data.Search]);
      } else if (response.data.Response === 'False') {
        axios.get(fallbackURL).then((response) => {
          if (response.data.Response === 'True') {
            setResults([response.data]);
          } else {
            setResults([]);
          }
        });
      }
    });
  }, [term]);

  return (
    <>
      <header className="logo">
        <img className="branding" src="images/shoppiesbrand.png" alt="Brand" />
        <SearchBar onSearch={(term) => setTerm(term)} />
      </header>

      <main>
        <div className="main-container">
          <div className="results-container">
            <Results results={results} addNomination={addNomination} />
          </div>
          <div className="results-container">
            <Nominations
              nominations={nominations}
              deleteNomination={deleteNomination}
            />
          </div>
        </div>
      </main>
    </>
  );
}

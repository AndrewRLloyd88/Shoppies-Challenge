import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Results from './Results';

export default function LiveSearch(props) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  //triggers on term changing
  useEffect(() => {
    const mainURL = `http://www.omdbapi.com/?s=${term}&type=movie&page=1&apikey=${process.env.REACT_APP_API_KEY}`;

    const fallbackURL = `http://www.omdbapi.com/?t=${term}&type=movie&apikey=${process.env.REACT_APP_API_KEY}`;

    axios.get(mainURL).then((response) => {
      if (response.data.Response === 'True') {
        setResults([...response.data.Search]);
        console.log(response.data);
        console.log(response.data.Response);
      } else if (response.data.Response === 'False') {
        axios.get(fallbackURL).then((response) => {
          if (response.data.Response === 'True') console.log(response);
          setResults([response.data]);
        });
      }
    });
  }, [term]);

  return (
    <Fragment>
      <header className="logo">
        <img className="branding" src="images/shoppiesbrand.png" alt="Brand" />
      </header>
      <main>
        <SearchBar onSearch={(term) => setTerm(term)} />
        <Results results={results} />
      </main>
    </Fragment>
  );
}

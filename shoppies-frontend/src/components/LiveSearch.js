import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Results from './Results';

export default function LiveSearch(props) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const testURL = `http://www.omdbapi.com/?s=${term}&page=1&apikey=${process.env.REACT_APP_API_KEY}`;

    axios.get(testURL).then((response) => {
      if (response.data.Response === 'True') {
        setResults([...response.data.Search]);
        console.log(response.data);
        console.log(response.data.Response);
      }
    });
  }, [term]);

  return (
    <Fragment>
      <header className="logo">
        <img src="images/brand.png" alt="Brand" />
      </header>
      <main>
        <SearchBar onSearch={(term) => setTerm(term)} />
        <Results results={results} />
      </main>
    </Fragment>
  );
}

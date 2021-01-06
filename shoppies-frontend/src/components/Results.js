import React from 'react';

import Movie from './Movie';

export default function Results(props) {
  const { results } = props;

  return results.map((movie) => {
    if (movie.Response === 'False') {
      return null;
    }
    return (
      <>
        <Movie key={movie.collectionId} {...movie} />
      </>
    );
  });
}

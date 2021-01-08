import React from 'react';

import Movie from './Movie';

export default function Results(props) {
  const { results } = props;

  return results.map((movie, index) => {
    if (movie.Response === 'False') {
      return null;
    }
    return (
      <>
        <Movie
          key={'m' + index}
          {...movie}
          addNomination={props.addNomination}
          nominations={props.nominations}
        />
      </>
    );
  });
}

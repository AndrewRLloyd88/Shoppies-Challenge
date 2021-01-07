import React from 'react';

import Nomination from './Nomination';

export default function Nominations(props) {
  console.log(props);
  const { nominations } = props;

  return nominations.map((nomination) => {
    return (
      <>
        <Nomination {...nomination} />
      </>
    );
  });
}

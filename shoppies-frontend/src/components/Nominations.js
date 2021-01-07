import React from 'react';

import Nomination from './Nomination';

export default function Nominations(props) {
  console.log(props);
  const { nominations } = props;

  //index is a number in this case
  return nominations.map((nomination, index) => {
    return (
      <>
        <Nomination
          key={index}
          index={index}
          {...nomination}
          deleteNomination={props.deleteNomination}
        />
      </>
    );
  });
}

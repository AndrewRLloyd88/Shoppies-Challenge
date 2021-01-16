import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Nomination from './Nomination';

const Slug = (props) => {
  const history = useHistory();
  let slug = props.match.params.slug;
  const [nominations, setNominations] = useState([]);
  const [total, setTotal] = useState(null);

  const getTotal = () => {
    axios.get(`api/total`).then((res) => {
      setTotal(res.data);
    });
  };

  useEffect(() => {
    getTotal();
    axios.get(`api/nominations/${slug}`).then((response) => {
      console.log(response);
      setNominations([...response.data]);
      console.log(nominations);
    });
  }, []);

  return (
    <div className="usr_nomination_container">
      <p className="usr_nomination_title">
        This user has nominated the following films:
      </p>
      <div>
        <div className="usr_nominations_section">
          {nominations.length !== 0
            ? nominations.map((nomination, index) => {
                return (
                  <>
                    <Nomination
                      className="usr_nomination"
                      key={index}
                      index={index}
                      {...nomination}
                      deleteNomination={props.deleteNomination}
                    />
                  </>
                );
              })
            : null}
        </div>
      </div>
      <div>
        {total !== null ? (
          <p>{total} people have voted for their favorites</p>
        ) : null}
      </div>
      <p>What will you nominate?</p>
      <Link className="home" to="/">
        <button>Get Voting...</button>
      </Link>
    </div>
  );
};

export default Slug;

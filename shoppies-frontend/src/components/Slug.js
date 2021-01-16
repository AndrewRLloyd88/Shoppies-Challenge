import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserNomination from './UserNomination';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Slug = (props) => {
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
                    <UserNomination
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
      <div className="usr_nomination_footer">
        <div>
          <img className="banner" src="images/shoppiesbrand.png" alt="Brand" />
        </div>
        <div className="ticket_area">
          {total !== null ? (
            <p>
              <span className="highlight">{total}</span> people have voted for
              their favorites.
            </p>
          ) : null}

          <span>What will you nominate?</span>
          <div>
            <Link className="home" to="/">
              <Button
                variant="outlined"
                color="secondary"
                href="#outlined-buttons"
              >
                Get Voting...
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slug;

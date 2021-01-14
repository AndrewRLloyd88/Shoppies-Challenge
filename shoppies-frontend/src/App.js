import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import LiveSearch from './components/LiveSearch';
import uuid from 'react-uuid';

export default function App() {
  const [state, setState] = useState({
    loggedInStatus: 'NOT_LOGGED_IN',
    user: {},
  });

  //posts a user to database and generates unique slug via UUID
  const createUser = () => {
    axios
      .post(
        '/api/registrations',
        {
          slug: uuid(),
        },
        {
          headers: {
            authorization: `Token token=${localStorage.getItem(
              'access_token'
            )}`,
          },
        },
        { withCredentials: false }
      )
      .then((response) => {
        if (response.data.status === 'created') {
          console.log(response.data);
          handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  //sets React state accordingly
  const handleSuccessfulAuth = (data) => {
    localStorage.setItem('access_token', data.user.access_token);
    setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user,
    });
  };

  //check if a user exists where access token === access token (in local storage)
  const checkLoginStatus = () => {
    axios
      .get('/api/logged_in', {
        headers: {
          authorization: `Token token=${localStorage.getItem('access_token')}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        if (
          response.data.logged_in &&
          state.loggedInStatus === 'NOT_LOGGED_IN'
        ) {
          setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user,
          });
          //catch all clause for setting states correctly
        } else if (
          !response.data.logged_in &&
          state.loggedInStatus === 'LOGGED_IN'
        ) {
          setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {},
          });
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  useEffect(() => {
    checkLoginStatus();
    //check if there is an access token in the browser
    if (!localStorage.getItem('access_token')) {
      createUser();
    }
  }, [state]);

  return <LiveSearch user={state} />;
}

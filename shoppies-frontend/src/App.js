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

  const checkLoginStatus = () => {
    axios
      .get('/api/logged_in', {
        headers: {
          authorization: `Token token=${localStorage.getItem('access_token')}`,
        },
        withCredentials: false,
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
        console.log('Explosions! ', error);
      });
  };
  useEffect(() => {
    checkLoginStatus();
  });

  const handleLogin = (data) => {
    localStorage.setItem('access_token', data.user.access_token);
    setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user,
    });
  };

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
          localStorage.setItem('access_token', response.data.user.access_token);
          setState({
            loggedInStatus: 'LOGGED_IN',
            slug: response.data.slug,
          });
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  // useEffect(() => {
  //   createUser();
  // }, []);

  return <LiveSearch />;
}

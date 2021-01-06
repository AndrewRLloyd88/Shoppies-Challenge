import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';
import LiveSearch from './components/LiveSearch';

export default function App() {
  const [message, setMessage] = useState('Click to fetch data!');

  const fetchData = () => {
    axios
      .get('/api/data') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        setMessage(response.data.message);
      });
  };

  return (
    <div class="container mw-100">
      <LiveSearch />
      <div>
        <h1>{message}</h1>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
    </div>
  );
}

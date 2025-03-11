import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [dbStatus, setDbStatus] = useState(null);

  useEffect(() => {
    // Fetch data from backend when component mounts
    axios.get('http://localhost:5000/db-test')
      .then(response => {
        setDbStatus(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setDbStatus({ error: 'Failed to connect to backend' });
      });
  }, []);

  return (
    <div className="App">
      <h1>Medi Cloud</h1>
      <h2>Database Status</h2>
      {dbStatus ? (
        <pre>{JSON.stringify(dbStatus, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { getFunction } from './services/apiService';
import UploadComponent from './components/UploadComponent';

function App() {

  function btnGetFunctionClick(){
    getFunction()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  return (
    <div>
      {!backendData?.users ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {backendData.users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      )}

      <button onClick={btnGetFunctionClick}>GET FUNCTION</button>

      <UploadComponent /> 
    </div>
    


  );
}

export default App;

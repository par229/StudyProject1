// App.js
import React, { useState } from 'react';
import Login from './components/Login';
import BoardList from './components/BoardList';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <div className="main-container">
          <BoardList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;

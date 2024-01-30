import React, { useState } from 'react';
import './App.css';
import PomodoroCounter from './PomodoroCounter';
import Login from './Login';

export const UserContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="App">
        {!isLoggedIn && <Login />}
        {isLoggedIn && <PomodoroCounter />}
      </div>
    </UserContext.Provider>
  );
}

export default App;

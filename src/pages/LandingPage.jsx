import React from 'react';
import { useState } from 'react';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div>
      <button onClick={handleLogIn}>{isLoggedIn ? 'Logout' : 'Login'}</button>

      {isLoggedIn ? (
        <p>Placeholder</p>
      ) : (
        <p>You are not logged in, Click log in to register for event</p>
      )}
    </div>
  );
};

export default LandingPage;

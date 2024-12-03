import React from 'react';
import { useState } from 'react';
import Event from '../components/event';
const LandingPage = ({ events }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <div>
      <button onClick={handleLogIn}>{isLoggedIn ? 'Logout' : 'Login'}</button>
      {isLoggedIn ? null : (
        <p>You are not logged in. Click to register for the event</p>
      )}
      {events.map((event) => (
        <Event
          eventName={event}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
};

export default LandingPage;

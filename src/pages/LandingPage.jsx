import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Event from '../components/event';
const LandingPage = ({ events }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setIsLoggedIn(false);
    }
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

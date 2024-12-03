import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Event from '../components/event';

const LandingPage = ({ events, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="header">
        <button
          type="button"
          className="login-button"
          onClick={handleLogIn}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
      {isLoggedIn ? null : (
        <p className="alert alert-primary info">
          You are not logged in. Click to register for the event
        </p>
      )}
      <div
        className={`${
          isLoggedIn ? 'events-container-logged-in' : 'events-container'
        }`}>
        {events.map((event) => (
          <Event
            key={event.id}
            eventName={event.name}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

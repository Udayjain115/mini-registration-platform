import React from 'react';

import { useState } from 'react';

const Event = ({ event, isLoggedIn }) => {
  const [isJoined, setIsJoined] = useState(false);
  const eventName = event.name;
  const eventDate = event.date;
  const eventDescription = event.description;
  const handleButtonClick = () => {
    setIsJoined(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="alert alert-info event-name">
        <p>Event: {eventName}</p>
        <p>Date: {eventDate}</p>
        <p>Description: {eventDescription}</p>{' '}
      </div>
    );
  } else {
    return (
      <div className="event-box">
        <div className="event-content alert-info alert">
          <p className="event-name">
            <p>Event: {eventName}</p>
            <p>Date: {eventDate}</p>
            <p>Description: {eventDescription}</p>{' '}
          </p>
          <button
            className="join-button"
            onClick={handleButtonClick}>
            {isJoined ? 'Joined!' : 'Join'}
          </button>
        </div>
      </div>
    );
  }
};

export default Event;

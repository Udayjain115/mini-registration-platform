import React from 'react';

import { useState } from 'react';

const Event = ({ eventName, isLoggedIn }) => {
  const [isJoined, setIsJoined] = useState(false);

  const handleButtonClick = () => {
    setIsJoined(true);
  };

  if (!isLoggedIn) {
    return <div className="alert alert-info event-name">{eventName}</div>;
  } else {
    return (
      <div className="event-box">
        <div className="event-content alert-info alert">
          <p className="event-name">{eventName}</p>
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

import React from 'react';
import { useState } from 'react';
const event = ({ eventName, isLoggedIn }) => {
  const [isJoined, setIsJoined] = useState(false);
  const handleButtonClick = () => {
    setIsJoined(true);
  };
  if (!isLoggedIn) {
    return <div>{eventName}</div>;
  } else {
    return (
      <div>
        {eventName}{' '}
        <button onClick={handleButtonClick}>
          {isJoined ? 'Joined!' : 'Join'}
        </button>
      </div>
    );
  }
};

export default event;

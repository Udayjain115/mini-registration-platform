import React from 'react';

const event = ({ eventName, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <div>{eventName}</div>;
  } else {
    return (
      <div>
        {eventName} <button>Join</button>
      </div>
    );
  }
};

export default event;

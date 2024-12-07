import React, { useEffect } from 'react';

import { useState } from 'react';
import userService from '../services/userService';

const Event = ({ event, isLoggedIn, users, setUsers, currentUser }) => {
  const [isJoined, setIsJoined] = useState(false);
  const eventName = event.name;
  const eventDate = event.date;
  const eventDescription = event.description;

  const handleButtonClick = () => {
    if (isJoined) return;
    const user = users.find((user) => user.email === currentUser.email);
    const updatedUser = {
      ...user,
      eventsJoined: [...user.eventsJoined, eventName],
    };
    userService.update(currentUser.email, updatedUser).then((updatedUser) => {
      setUsers(
        users.map((user) =>
          user.email === currentUser.email ? updatedUser : user
        )
      );
    });

    setIsJoined(true);
  };

  useEffect(() => {
    if (currentUser) {
      const user = users.find((user) => user.email === currentUser.email);
      if (user && user.eventsJoined.includes(eventName)) {
        setIsJoined(true);
      }
    }
  }, [users, currentUser, eventName]);

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
          <div className="event-name">
            <p>Event: {eventName}</p>
            <p>Date: {eventDate}</p>
            <p>Description: {eventDescription}</p>{' '}
          </div>
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

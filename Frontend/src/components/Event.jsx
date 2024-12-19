import React, { useEffect } from 'react';

import { useState } from 'react';
import userService from '../services/userService';

const Event = ({
  event,
  isLoggedIn,
  users,
  setUsers,
  currentUser,
  setCurrentUser,
}) => {
  const [isJoined, setIsJoined] = useState(false);
  const eventName = event.name;
  const eventDate = event.date;
  const eventDescription = event.description;
  const competitionID = event.competitionId;

  const handleButtonClick = () => {
    if (isJoined) return;
    const user = users.find((user) => user.email === currentUser.email);
    const updatedUser = {
      ...currentUser,
      eventsJoined: [...currentUser.eventsJoined, eventName],
    };

    console.log(updatedUser);

    userService.update(currentUser.email, updatedUser).then((updatedUser) => {
      setUsers(
        users.map((user) =>
          user.email === currentUser.email ? updatedUser : user
        )
      );
    });
    setCurrentUser(updatedUser);

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
        <p className="text-break">Event: {eventName}</p>
        <p className="text-break">Date: {eventDate}</p>
        <p className="text-break">Description: {eventDescription}</p>{' '}
        <p className="text-break">Competition: {competitionID}</p>
      </div>
    );
  } else {
    return (
      <div className="event-box">
        <div className="event-content alert-info alert">
          <div className="event-name">
            <p className="text-break">Event: {eventName}</p>
            <p className="text-break">Date: {eventDate}</p>
            <p className="text-break">Description: {eventDescription}</p>{' '}
            <p className="text-break">Competition: {competitionID}</p>
            <button
              className="join-button"
              onClick={handleButtonClick}>
              {isJoined ? 'Joined!' : 'Join'}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Event;

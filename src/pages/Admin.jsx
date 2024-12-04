import React from 'react';
import Event from '../components/event';
const admin = ({ events }) => {
  return (
    <>
      <h1 className="admin-text admin-title">Admin Page</h1>
      <h3 className="admin-text">Events:</h3>
      <div className="events-container-logged-in">
        {events.map((event) => (
          <Event
            key={event.id}
            eventName={event.name}
            isLoggedIn={false}
          />
        ))}
      </div>
    </>
  );
};

export default admin;

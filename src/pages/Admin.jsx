import React from 'react';
import Event from '../components/event';
const admin = ({ events }) => {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Only authorized users can access this page.</p>

      {events.map((event) => (
        <Event
          key={event.id}
          eventName={event.name}
          isLoggedIn={false}
        />
      ))}
    </div>
  );
};

export default admin;

import React from 'react';
import Event from '../components/event';
import Form from '../components/Form';
import { useState } from 'react';
const admin = ({ events, users }) => {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvent('');
    setDescription('');
    setDate('');
  };
  const buttons = [{ text: 'Create Event', handle: handleSubmit }];
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === 'event') setEvent(value);
    if (name === 'description') setDescription(value);
    if (name === 'date') setDate(value);
  };

  return (
    <>
      <div className="admin-page">
        <div className="event-block">
          <h1 className="admin-text admin-title">Admin Page</h1>
          <h3 className="admin-text">Events:</h3>
          <div className="events-container-logged-in margin-bottom-20">
            {events.map((event) => (
              <Event
                key={event.id}
                event={event}
                isLoggedIn={false}
              />
            ))}
          </div>
        </div>
        <h3 className="admin-text">Create Event</h3>
        <div className="create-events"></div>
        <Form
          handleSubmit={handleSubmit}
          fields={[
            {
              label: 'Event Name',
              type: 'text',
              name: 'event',
              value: event,
            },
            {
              label: 'Event Description',
              type: 'text',
              name: 'description',
              value: description,
            },
            { label: 'Event Date', type: 'date', name: 'date', value: date },
          ]}
          buttons={buttons}
          handleChange={handleEventChange}
        />
      </div>
      <h3 className="admin-text">Users:</h3>
      <div className="user-container">
        {users.map((user) => (
          <div className="alert alert-info">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default admin;

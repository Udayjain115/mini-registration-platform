import React from 'react';
import Event from '../components/event';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import eventService from '../services/eventService';
const admin = ({
  events,
  users,
  setEvents,
  isLoggedIn,
  currentUser,
  setCurrentUser,
}) => {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [notAllowed, setNotAllowed] = useState(true);

  useEffect(() => {
    eventService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
  }, []);

  useEffect(() => {
    if (currentUser === null || currentUser.email !== 'admin') {
      console.log(currentUser);

      setNotAllowed(true);

      navigate('/');
    } else {
      setNotAllowed(false);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name: event,
      description: description,
      date: date,
    };

    eventService.create(newEvent).then((createdEvent) => {
      setEvents(eventService.getAll());
    });

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
  if (notAllowed) {
    return null;
  }
  return (
    <>
      <h1 className="admin-text admin-title">Admin Page</h1>
      <button
        className="login-button"
        onClick={handleLogout}>
        Logout
      </button>
      <div className="admin-page">
        <h3 className="admin-text">Events:</h3>
        <div className="event-block">
          <div className="events-container-logged-in margin-bottom-20">
            {events.map((event) => (
              <Event
                key={event.id}
                event={event}
                isLoggedIn={false}
              />
            ))}
          </div>
          <span className="event-creator">
            <h3>Create Event</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="event">Event Name:</label>
                <input
                  type="text"
                  id="event"
                  name="event"
                  value={event}
                  onChange={handleEventChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Event Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleEventChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="date">Event Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleEventChange}
                  required
                />
              </div>
              <button type="submit">Create Event</button>
            </form>
          </span>
        </div>
        <h3 className="admin-text">Users:</h3>
        <div className="user-container">
          {users.map((user) => (
            <div
              className="alert alert-info"
              key={user.email}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Events Joined: {user.eventsJoined.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default admin;

import React from 'react';
import Event from '../components/event';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import eventService from '../services/eventService';
import Notification from '../components/Notification';
import Form from '../components/Form';
import User from '../components/User';
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
  const [notification, setNotification] = useState('');

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

    eventService
      .create(newEvent)
      .then((createdEvent) => {
        eventService.getAll().then((fetchedEvents) => {
          setEvents(fetchedEvents);
        });
      })
      .catch((error) => {
        console.log(error);

        setNotification('Event Name already Exists');
      });
    setTimeout(() => {
      setNotification('');
    }, 5000);

    setEvent('');
    setDescription('');
    setDate('');
  };
  const buttons = [{ text: 'Create Event', handle: handleSubmit }];
  const fields = [
    { label: 'Event Name', type: 'text', name: 'event', value: event },
    {
      label: 'Event Description',
      type: 'text',
      name: 'description',
      value: description,
    },
    { label: 'Event Date', type: 'date', name: 'date', value: date },
  ];
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
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-8">
            <h3 className="admin-text">Events:</h3>
            <div className="event-block">
              <div className="events-container-logged-in margin-bottom-20">
                {console.log(events)}
                {events.map((event) => (
                  <Event
                    users={users}
                    key={event.id}
                    event={event}
                    isLoggedIn={false}
                    currentUser={currentUser}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-4">
            <Form
              className="signup-form"
              message={notification}
              handleSubmit={handleSubmit}
              handleChange={handleEventChange}
              fields={fields}
              buttons={buttons}
            />
          </div>
        </div>
        <h3 className="admin-text">Users:</h3>
        <div className="user-container">
          {users.map((user) => (
            <User
              key={user.id}
              users={user}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default admin;

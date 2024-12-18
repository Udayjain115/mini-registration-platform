import React from 'react';
import Event from '../components/event';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
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
  const [competition, setCompetition] = useState('');
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

  const onCompetitionSubmit = (e) => {
    e.preventDefault();

    const newCompetition = {
      name: competition,
      questionIDs: [],
    };
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
        setEvent('');
        setDescription('');
        setDate('');
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response && error.response.status === 400) {
          setNotification('Please fill in all fields');
        } else if (error.response && error.response.status === 500) {
          setNotification('Event Already Exists');
        }
      });
    setTimeout(() => {
      setNotification('');
    }, 5000);
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

  const competitionFields = [
    { label: 'Competition Name', type: 'text', name: 'competition' },
  ];

  const competitionButtons = [
    { text: 'Create Competition', handle: onCompetitionSubmit },
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
      <Container fluid>
        <Row>
          <Col lg={12}>
            <button
              className="btn btn-primary btn-lg ms-auto mt-2 mb-2 d-block"
              onClick={handleLogout}>
              Logout
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <Form
              className="signup-form ms-5"
              message={notification}
              handleSubmit={handleSubmit}
              handleChange={handleEventChange}
              fields={fields}
              buttons={buttons}
            />
          </Col>
          <Col lg={4}>
            <Form
              className="signup-form ms-5"
              message={notification}
              fields={competitionFields}
              buttons={competitionButtons}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            {' '}
            <div className="events-container ">
              {console.log(events)}{' '}
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
          </Col>
        </Row>
      </Container>
    </>
    // <>
    //   <h1 className="admin-text admin-title">Admin Page</h1>
    //   <button
    //     className="signup-button"
    //     onClick={handleLogout}>
    //     Logout
    //   </button>
    //   <div className="container-fluid">
    //     <div className="row no-gutters">
    //       <div className="col-8">
    //         <h3 className="admin-text">Events:</h3>
    //         <div className="event-block">
    //           <div className="events-container-logged-in margin-bottom-20">
    //             {console.log(events)}
    //             {events.map((event) => (
    //               <Event
    //                 users={users}
    //                 key={event.id}
    //                 event={event}
    //                 isLoggedIn={false}
    //                 currentUser={currentUser}
    //               />
    //             ))}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-4">
    //         <Form
    //           className="signup-form"
    //           message={notification}
    //           handleSubmit={handleSubmit}
    //           handleChange={handleEventChange}
    //           fields={fields}
    //           buttons={buttons}
    //         />
    //       </div>
    //     </div>
    //     <h3 className="admin-text">Users:</h3>
    //     <div className="user-container">
    //       {users.map((user) => (
    //         <User
    //           key={user.id}
    //           users={user}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </>
  );
};

export default admin;

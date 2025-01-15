import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Event from '../components/event';
import userService from '../services/userService';
import Notification from '../components/Notification';
import competitionService from '../services/competitionService';
import eventService from '../services/eventService';
import User from '../components/User';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { filterOngoing } from '../utils/filterOngoing';
const LandingPage = ({
  events,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  users,
  setUsers,
}) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(events);

  console.log(filteredEvents);
  console.log('Recieved Events', events);

  const onCheckChange = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      setFilteredEvents(events);
    }

    if (!isChecked) {
      filterOngoing(events, setFilteredEvents);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.email === 'admin') {
      navigate('/admin');
    }
  }, [currentUser]);

  useEffect(() => {
    userService.getAll().then((initialUsers) => {
      setUsers(initialUsers);
    });

    eventService.getAll().then((initialEvents) => {
      setFilteredEvents(initialEvents);
    });
  }, []);

  const handleLogIn = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      setIsLoggedIn(false);
      console.log('logging out');

      setCurrentUser(null);
    }
  };

  return (
    <Container
      fluid
      className="full-page-bg">
      <Row>
        <Col xs={9}></Col>
        <Col
          xs={3}
          className="d-flex justify-content-end align-items-center my-2">
          <button
            type="button"
            className="btn btn-primary me-4 "
            onClick={handleLogIn}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
          {!isLoggedIn && (
            <button
              type="button"
              className="btn btn-primary me-4"
              onClick={() => navigate('/signup')}>
              Sign up
            </button>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          {!isLoggedIn ? (
            <Notification
              className="alert alert-primary info my-2"
              message="You are not logged in. Click Login to register for the event"
            />
          ) : null}
        </Col>
      </Row>

      <Row>
        <Row className="my-4">
          <Col xs={isLoggedIn ? 6 : 12}>
            <h2 className=" events-label">Events</h2>
          </Col>
        </Row>
        <Row>
          {isLoggedIn ? (
            <Col>
              <div className="d-flex align-items-center">
                <h3 className="me-3 mb-2">Filter By:</h3>
                <Form.Check
                  type="checkbox"
                  checked={isChecked}
                  onChange={onCheckChange}
                  id="filter-ongoing"
                  label="Ongoing"
                  className="mb-0"
                />
              </div>
            </Col>
          ) : null}
        </Row>
        <Col xs={isLoggedIn ? 8 : 12}>
          {filteredEvents.map((event) => (
            <Event
              currentUser={currentUser}
              users={users}
              setUsers={setUsers}
              key={event.name}
              setCurrentUser={setCurrentUser}
              event={event}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </Col>
        <Col
          xs={isLoggedIn ? 4 : 0}
          className="align-buttons ">
          {isLoggedIn ? (
            <div className="">
              <User
                user={currentUser}
                setUsers={setUsers}
                users={users}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;

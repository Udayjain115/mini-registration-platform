import React from 'react';
import Event from '../components/event';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import eventService from '../services/eventService';
import Notification from '../components/Notification';
import Form from '../components/Form';
import competitionService from '../services/competitionService';
import User from '../components/User';
import Competition from '../components/Competition';
import questionService from '../services/questionService';
const admin = ({
  events,
  users,
  setEvents,
  isLoggedIn,
  currentUser,
  setCurrentUser,
  competitions,
  setCompetitions,
  questions,
  setQuestions,
}) => {
  const navigate = useNavigate();
  const [notAllowed, setNotAllowed] = useState(true);

  console.log(currentUser);
  useEffect(() => {
    eventService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
  }, []);

  useEffect(() => {
    competitionService.getAll().then((initialCompetitions) => {
      setCompetitions(initialCompetitions);
    });
  }, [questions]);

  useEffect(() => {
    console.log(competitions);
  }, [competitions]);

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

  const buttonData = [
    {
      title: 'Create An Event',
      description: 'Create an Event for users',
      onClick: () => {
        navigate('/eventCreation');
      },
    },
    {
      title: 'Create A Competition',
      description: 'Create a Competition for an Event',
      onClick: () => {
        navigate('/competitionCreation');
      },
    },
    {
      title: 'Create A Question',
      description: 'Create A Question for a Competition',
      onClick: () => {
        navigate('/questionCreation');
      },
    },
  ];

  if (notAllowed) {
    return null;
  }
  return (
    <>
      <Container
        className="full-page-bg"
        fluid>
        <Row>
          <Col lg={12}>
            <button
              className="btn btn-primary ms-auto mt-2 mb-2 d-block"
              onClick={handleLogout}>
              Logout
            </button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          {buttonData.map((button) => (
            <Col
              style={{ backgroundColor: 'white' }}
              key={button.title}
              className="border border-secondary"
              lg={3}
              md={3}
              sm={3}>
              <button
                onClick={button.onClick}
                className="h-100 fw-bold text-start w-100 btn btn-lg">
                {button.title}
                <p className="text-muted fs-6">{button.description}</p>
              </button>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={6}>
            {' '}
            <div className=" ">
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
          <Col lg={6}>
            <div className="">
              {competitions.map((competition) => (
                <Competition
                  isAdmin={true}
                  events={events}
                  key={competition.id}
                  competition={competition}
                  setEvents={setEvents}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default admin;

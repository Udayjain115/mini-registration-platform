import React from 'react';
import Event from '../components/event';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Form,
} from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import eventService from '../services/eventService';
import Notification from '../components/Notification';
import Form2 from '../components/Form';
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
  const [isChecked, setIsChecked] = useState(false);
  const [filteredCompetitions, setFilteredCompetitions] =
    useState(competitions);

  console.log('COMPETITIONS', competitions);
  const onCheckChange = () => {
    setIsChecked(!isChecked);

    if (isChecked) {
      setFilteredCompetitions(competitions);
    } else {
      const ongoingCompetitions = competitions.filter((competition) => {
        const currentTime = new Date();
        const start = new Date(competition.startDate);
        const end = new Date(competition.endDate);
        return currentTime > start && currentTime < end;
      });

      console.log(ongoingCompetitions, 'ongoing');
      setFilteredCompetitions(ongoingCompetitions);
    }
  };

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
    competitionService.getAll().then((initialCompetitions) => {
      setFilteredCompetitions(initialCompetitions);
    });
  }, []);

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
      description: 'Add A Question to the Question Bank',
      onClick: () => {
        navigate('/questionCreation');
      },
    },
    {
      title: 'Add Questions to Competition',
      description: 'Add Questions From The Question Bank to Competition',
      onClick: () => {
        navigate('/addQuestionsToCompetition');
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
              key={button.title}
              className=""
              lg={3}
              md={3}
              sm={3}>
              <button
                onClick={button.onClick}
                className="h-100 fw-bold text-start w-100 btn btn-ignore btn-lg">
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
              <h2 className="events-label my-5 admin-event">Events</h2>
              <div className="my-3">
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
          </Col>
          <Col lg={6}>
            <div className="">
              <h2 className=" events-label my-5">Competitions</h2>
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
              {filteredCompetitions.map((competition) => (
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

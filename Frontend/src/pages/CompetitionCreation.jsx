import React from 'react';
import Form from '../components/Form';
import { useState } from 'react';
import competitionService from '../services/competitionService';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventCreation = () => {
  const [competition, setCompetition] = useState('');
  const [competitionNotification, setCompetitionNotification] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();

  const handleCompeititionChange = (e) => {
    const { name, value } = e.target;
    if (name === 'competition') {
      setCompetition(e.target.value);
    }
    if (name === 'start_time') {
      setStartTime(e.target.value);
    }
    if (name === 'end_time') {
      setEndTime(e.target.value);
    }
  };

  const onCompetitionSubmit = (e) => {
    if (new Date(startTime) >= new Date(endTime)) {
      setCompetitionNotification('Start time must be before end time.');
      return;
    }
    e.preventDefault();

    const newCompetition = {
      title: competition.trimEnd(),
      startDate: startTime.trimEnd(),
      endDate: endTime.trimEnd(),
    };

    competitionService
      .create(newCompetition)
      .then((createdCompetition) => {
        competitionService.getAll().then((fetchedCompetitions) => {
          setCompetitions(fetchedCompetitions);
        });
        setCompetition('');
        navigate('/admin');
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response && error.response.status === 400) {
          setCompetitionNotification('Please fill in all fields');
        } else if (error.response && error.response.status === 500) {
          setCompetitionNotification('Competition Already Exists');
        }
      });
    setTimeout(() => {
      setCompetitionNotification('');
    }, 5000);
  };

  const competitionFields = [
    {
      label: 'Competition Name',
      type: 'text',
      name: 'competition',
      value: competition,
    },
    {
      label: 'Competition Start Time',
      type: 'datetime-local',
      name: 'start_time',
      value: startTime,
    },

    {
      label: 'Competition End Time',
      type: 'datetime-local',
      name: 'end_time',
      value: endTime,
    },
  ];

  const competitionButtons = [
    { text: 'Create Competition', handle: onCompetitionSubmit },
  ];

  return (
    <Container
      className="full-page-bg shadow-sm"
      fluid>
      <Row>
        <Col>
          <h1 className=" mt-5 px-5 text-start">
            Create Competition <br />
            <span className="fs-5 text-muted ">
              Create a Competition for an Event
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col lg={5}>
          <Form
            className="signup-form ms-5"
            message={competitionNotification}
            fields={competitionFields}
            buttons={competitionButtons}
            handleChange={handleCompeititionChange}
            onSubmit={onCompetitionSubmit}
            key={competition.title}
          />
        </Col>
      </Row>
      <Row>
        <div className=" ms-5 py-4">
          <p fs-5>
            Dont Want To Create A Competition?{' '}
            <Link
              to="/admin"
              className="text-decoration-none text-btn">
              <span className="lead fw-bold ">Go Back</span>
            </Link>
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default EventCreation;

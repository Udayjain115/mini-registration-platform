import React from 'react';
import Form from '../components/Form';
import { useState } from 'react';
import eventService from '../services/eventService';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EventCreation = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [notification, setNotification] = useState('');
  const [event, setEvent] = useState('');
  const navigate = useNavigate();
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === 'event') {
      setEvent(value);
    }
    if (name === 'description') setDescription(value);
    if (name === 'date') setDate(value);
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
        navigate('/admin');
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

  const buttons = [{ text: 'Create Event', handle: handleSubmit }];

  return (
    <Container
      className="full-page-bg "
      fluid>
      <Row>
        <Col>
          <h1 className=" mt-5 px-5 text-start">
            Create Event <br />
            <span className="fs-5 text-muted ">
              Create an Event For Students
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col lg={5}>
          <Form
            className="signup-form ms-5"
            message={notification}
            handleSubmit={handleSubmit}
            handleChange={handleEventChange}
            fields={fields}
            buttons={buttons}
          />
        </Col>
      </Row>
      <Row>
        <div className=" ms-5 py-4">
          <p fs-5>
            Dont Want To Create An Event?{' '}
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

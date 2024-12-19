import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import eventService from '../services/eventService';

const Competition = ({ competition, events, isAdmin }) => {
  const [selectedEvent, setSelectedEvent] = useState('');

  const handleLink = (e) => {
    setSelectedEvent(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('Linking competition to', selectedEvent);

    eventService.findByName(selectedEvent).then((event) => {
      const updatedEvent = {
        ...event,
        competitionId: competition.title,
      };

      eventService.update(selectedEvent, updatedEvent).then((updatedEvent) => {
        console.log(updatedEvent);
      });
    });
  };

  return (
    <>
      <Row className="alert-info alert">
        <Col lg={isAdmin ? 6 : 12}>
          <p className="text-break">
            Title: <b>{competition.title}</b>
          </p>
          <p className="text-break">
            Question: <b>{competition.questionIds.toString()}</b>
          </p>
        </Col>
        {isAdmin && (
          <Col lg={6}>
            <p className="text-break">Link Competition To Event </p>
            <Row>
              <Col lg={9}>
                <select
                  onChange={handleLink}
                  className="form-select">
                  <option
                    value=""
                    disabled
                    selected>
                    Select Event
                  </option>
                  {events.map((event) => (
                    <option
                      key={event.id}
                      value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col lg={3}>
                <button
                  onClick={handleSubmit}
                  className="btn btn-primary">
                  Link
                </button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Competition;

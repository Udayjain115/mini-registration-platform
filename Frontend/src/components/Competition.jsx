import React from 'react';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';
import eventService from '../services/eventService';
import { formatTime } from '../utils/timeUtils';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Competition = ({ competition, events, isAdmin, setEvents }) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  console.log('Competition', competition);

  const handleLink = (e) => {
    setSelectedEvent(e.target.value);
  };

  const isLinkDisabled = !selectedEvent || competition.questionIds.length === 0;

  const getTooltipMessage = () => {
    if (!selectedEvent) {
      return 'Please select an event to link';
    } else if (competition.questionIds.length === 0) {
      return 'Cannot link without questions in the competition.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    console.log('Linking competition to', selectedEvent);

    eventService.findByName(selectedEvent).then((event) => {
      const updatedEvent = {
        ...event,
        competitionId: competition.title,
      };

      eventService.update(selectedEvent, updatedEvent).then((updatedEvent) => {
        eventService.getAll().then((events) => {
          setEvents(events);
        });
      });
    });
  };

  return (
    <Card
      className="my-3 px-4 py-3 shadow-sm"
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}>
      <Card.Body>
        <Row className="align-items-start">
          {/* Left Column: Competition Details */}
          <Col xs={isAdmin ? 6 : 12}>
            <Card.Title>{competition.title}</Card.Title>
            <Card.Text>
              <strong>Questions:</strong> {competition.questionIds.join(', ')}
            </Card.Text>
            <Card.Text>
              <strong>Start Date:</strong>{' '}
              {`${competition.startDate.split('T')[0]} ${formatTime(
                competition.startDate.split('T')[1]
              )}`}
            </Card.Text>
            <Card.Text>
              <strong>End Date:</strong>{' '}
              {`${competition.endDate.split('T')[0]} ${formatTime(
                competition.endDate.split('T')[1]
              )}`}
            </Card.Text>
          </Col>

          {/* Right Column: Link Competition to Event */}
          {isAdmin && (
            <Col xs={6}>
              <Card.Title>Link Competition to Event</Card.Title>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Form.Group controlId="selectEvent">
                  <Form.Control
                    as="select"
                    value={selectedEvent}
                    onChange={handleLink}
                    className="mb-3">
                    <option
                      value=""
                      disabled>
                      Select Event
                    </option>
                    {events.map((event) => (
                      <option
                        key={event.id}
                        value={event.id}>
                        {event.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <OverlayTrigger
                  placement="top"
                  overlay={
                    isLinkDisabled ? (
                      <Tooltip id="tooltip-disabled">
                        {getTooltipMessage()}
                      </Tooltip>
                    ) : (
                      <></>
                    )
                  }>
                  <span className="d-inline-block">
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={
                        !selectedEvent || competition.questionIds.length === 0
                      }
                      style={isLinkDisabled ? { pointerEvents: 'none' } : {}}>
                      Link
                    </Button>
                  </span>
                </OverlayTrigger>
              </Form>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Competition;

import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Competition = ({ competition, events, isAdmin }) => {
  const handleLink = (e) => {
    console.log(e.target.value);
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
                    Select competition
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
                <button className="btn btn-primary">Link</button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Competition;

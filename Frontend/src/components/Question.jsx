// ...existing code...
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const Question = ({ question }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="question-card card my-3 px-4 py-3"
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}>
      <Row>
        <Col
          className=""
          xs={8}>
          <h2 className="">{question.title}</h2>
          {showDetails && (
            <>
              <div className="d-flex flex-wrap">
                {question.options.map((option, index) => (
                  <p
                    key={index}
                    className="me-4 mb-1">
                    {`Option ${index}: ${option}`}
                  </p>
                ))}
              </div>
              <p className="mt-0 mb-2">{`Correct Answer: ${
                question.options[question.correctChoiceIndex - 1]
              }`}</p>
              <p className="mb-2">
                {' '}
                Question Difficulty:{' '}
                {question.difficulty.charAt(0).toUpperCase() +
                  question.difficulty.slice(1).toLowerCase()}
              </p>

              <div className="d-flex flex-wrap">
                <p className="me-4">Topics: </p>
                {question.topics.map((option, index) => (
                  <p
                    key={index}
                    className="me-4 mb-1">
                    {`${option}`}
                  </p>
                ))}
              </div>
            </>
          )}
        </Col>
        <Col
          className=" align-buttons"
          xs={4}>
          <button
            className=" btn btn-primary "
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Show Less ▲' : 'Show More ▼'}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Question;
// ...existing code...

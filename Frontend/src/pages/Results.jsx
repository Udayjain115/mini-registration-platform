import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocation, Link } from 'react-router-dom';

const Results = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    if (!currentUser || currentUser.email !== 'admin') {
      console.log('No competition ID');
      navigate('/');
      return null;
    }
    navigate('/admin');
    return null;
  }
  const scoreArray = Array.from(location.state.scoreMap.entries());
  console.log(scoreArray);
  useEffect(() => {
    console.log(location.state);
    if (!location.state || !location.state.competitionID) {
      navigate('/admin');
      return;
    }
  }, [location.state]);

  console.log(location.state);
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            className="
            mt-5 px-5 text-start
          fw-bold fs-2
          ">
            <p>{`Results For ${location.state.competitionID}`}</p>
          </Col>
        </Row>
        <Row>{console.log(scoreArray)}</Row>
        <Row>
          <Col
            className="mt-5 px-5"
            lg={7}>
            <Table
              className="results-table"
              striped
              bordered
              responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Participant</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {scoreArray.map(([participant, score], index) => (
                  <tr key={participant}>
                    <td>{index + 1}</td>
                    <td>{participant}</td>
                    <td>{score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Link
            to="/admin"
            className="text-decoration-none text-btn">
            <span className="p-5 lead fw-bold ">Go Back</span>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default Results;

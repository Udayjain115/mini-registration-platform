import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import competitionService from '../services/competitionService';
import questionService from '../services/questionService';
import attemptService from '../services/attemptService';
import userService from '../services/userService';
import { Button, Card, CardBody, Col, Container, Row } from 'react-bootstrap';

const QuizPage = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [competitionQuestions, setCompetitionQuestions] = useState([]);
  const [currentCompetition, setCurrentCompetition] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(1000);

  const [answers, setAnswers] = useState({});
  console.log(competitionQuestions);
  console.log(location.state);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const adminUserName = import.meta.env.VITE_ADMIN_USERNAME;

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / 86400);
    seconds = seconds % 86400;
    const hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${days} Days ${hours < 10 ? '0' : ''} ${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  console.log(currentCompetition);
  useEffect(() => {
    const now = new Date();
    const endTime = new Date(currentCompetition.endDate);
    const timeDiff = endTime - now;

    console.log(timeDiff);

    setTimeRemaining(Math.floor(timeDiff / 1000));

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handlePrevios = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, competitionQuestions.length - 1)
    );
  };

  const handleOptionChange = (questionId, selectedOption) => {
    const answer = {
      questionId: questionId,
      selectedOption: selectedOption,
    };

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
    console.log('Answer:', answers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Answers:', answers);
    const attempt = {
      studentEmail: currentUser.email,
      competitionId: location.state.competitionID,
      attempts: answers,
    };

    attemptService.create(attempt).then((attempt) => {
      console.log('Attempt:', attempt);
    });

    userService.getOne(currentUser.email).then((user) => {
      const updatedUser = {
        ...user,
        competitionsJoined: [
          ...(user.competitionsJoined || []),
          location.state.competitionID,
        ],
      };

      userService
        .update(currentUser.email, updatedUser)
        .then((updatedUser) => {
          console.log('Updated User:', updatedUser);
          setCurrentUser(updatedUser);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    navigate('/');
  };

  useEffect(() => {
    if (!currentUser) {
      console.log('No user');
      navigate('/');
      return;
    }

    if (!location.state || !location.state.competitionID) {
      console.log('No competition ID');

      if (currentUser.email === adminUserName) {
        navigate('/admin');
      } else {
        navigate('/');
      }
      return;
    }
    competitionService
      .getOne(location.state.competitionID)
      .then((competition) => {
        setCurrentCompetition(competition);
        const questionPromises = competition.questionIds.map((questionId) => {
          return questionService.getOne(questionId);
        });

        Promise.all(questionPromises).then((questions) => {
          setCompetitionQuestions(questions);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location, currentUser, navigate, adminUserName]);

  console.log(competitionQuestions);
  console.log(competitionQuestions.length);
  const currentQuestion = competitionQuestions[currentQuestionIndex];
  console.log(currentQuestion);
  if (!currentQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col
            lg={10}
            className=" timer text-center mt-4">
            Time Remaining: {formatTime(timeRemaining)}
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col lg={10}>
            <Card>
              <CardBody>
                <Row className="event-header">
                  <Col>
                    <Button
                      variant="primary"
                      disabled={currentQuestionIndex === 0}
                      onClick={handlePrevios}>
                      Previous
                    </Button>
                  </Col>
                  <Col className="text-center">
                    <p>{`Question ${currentQuestionIndex + 1} of ${
                      competitionQuestions.length
                    }`}</p>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      className="float-end"
                      disabled={
                        currentQuestionIndex === competitionQuestions.length - 1
                      }
                      onClick={handleNext}>
                      Next
                    </Button>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col>
                    <h4>{currentQuestion.title}</h4>
                    <ul className="list-group">
                      {currentQuestion.options.map((option, index) => (
                        <li
                          key={index}
                          className={`list-group-item ${
                            answers[currentQuestion.title] === option
                              ? 'active'
                              : ''
                          }`}
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            handleOptionChange(currentQuestion.title, option)
                          }>
                          {option}
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                {currentQuestionIndex === competitionQuestions.length - 1 && (
                  <Row className="mt-4">
                    <Col className="text-end">
                      <Button
                        variant="primary"
                        onClick={handleSubmit}>
                        Submit Quiz
                      </Button>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col className="mt-5 mx-2">
                    <Link
                      to="/"
                      className="text-decoration-none text-btn">
                      <span className="lead fw-bold ">Exit Quiz</span>
                    </Link>
                    <p className="text-muted fs-6">
                      Attempt Will Not be Submitted
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default QuizPage;

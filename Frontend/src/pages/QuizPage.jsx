import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import competitionService from '../services/competitionService';
import questionService from '../services/questionService';
import attemptService from '../services/attemptService';
import { Button } from 'react-bootstrap';

const QuizPage = ({ currentUser }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const [competitionQuestions, setCompetitionQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  console.log(location.state.competitionID);

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

    navigate('/');
  };
  useEffect(() => {
    competitionService
      .getOne(location.state.competitionID)
      .then((competition) => {
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
  }, [location.state.competitionID]);

  console.log(competitionQuestions);

  return (
    <div>
      <h1>Quiz Page</h1>
      <h2>Competition Questions</h2>
      {competitionQuestions.map((question) => (
        <div
          className="form-check "
          key={question.title}>
          <p>{question.title}</p>
          {question.options.map((option) => {
            return (
              <div key={option}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={question.title}
                  id={option}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(question.title, e.target.value)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={option}>
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        className="btn btn-primary">
        Submit
      </Button>
    </div>
  );
};

export default QuizPage;

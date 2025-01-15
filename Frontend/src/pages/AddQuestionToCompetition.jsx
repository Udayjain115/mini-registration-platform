import React from 'react';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import eventService from '../services/eventService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DropDown from '../components/DropDown';
import competitionService from '../services/competitionService';
import Notification from '../components/Notification';

const AddQuestionToCompetition = ({
  competitions,
  questions,
  setCompetitions,
}) => {
  const [selectionMode, setSelectionMode] = useState('single');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [notification, setNotification] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    console.log('questions', questions);
    setFilteredQuestions(
      questions.filter((question) => {
        if (
          (difficultyFilter === 'all' || difficultyFilter === '') &&
          (topicFilter === 'all' || topicFilter === '')
        ) {
          return question;
        } else if (difficultyFilter === 'all' || difficultyFilter === '') {
          console.log('topic filter', topicFilter);

          return question.topics.includes(topicFilter);
        } else if (topicFilter === 'all' || topicFilter === '') {
          console.log('difficulty filter', difficultyFilter);
          return question.difficulty === difficultyFilter.toUpperCase();
        } else
          return (
            question.difficulty === difficultyFilter.toUpperCase() &&
            question.topics.includes(topicFilter)
          );
      })
    );
    console.log(questions);
  }, [topicFilter, difficultyFilter, questions]);
  const handleModeChange = (e) => {
    setSelectionMode(e.target.value);
    setSelectedQuestion('');
    setSelectedQuestions([]);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;

    if (id === 'difficultySelect') {
      setDifficultyFilter(value);
    }

    if (id === 'topicsSelect') {
      setTopicFilter(value);
    }
  };

  const handleSingleSelect = (e) => {
    setSelectedQuestion(e.target.value);
  };

  const handleCheckboxChange = (questionId) => {
    console.log('questionID' + questionId);
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSubmit = () => {
    if (selectionMode === 'single') {
      competitionService.getOne(selectedCompetition).then((competition) => {
        competition.questionIds.push(selectedQuestion);
        competitionService
          .update(selectedCompetition, competition)
          .then((updatedCompetition) => {
            competitionService.getAll().then((fetchedCompetitions) => {
              setCompetitions(fetchedCompetitions);
              console.log(fetchedCompetitions);

              setSelectedCompetition('');
              setSelectedQuestion('');
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              console.log(error.response.data.errors[0].defaultMessage);
              setNotification('Question Already Exists In The Competition');
              setTimeout(() => {
                setNotification('');
              }, 5000);
            }
            console.log(error.response.data);
            console.log(error.response.status);
          });

        setSelectedCompetition('');
        setSelectedQuestion('');
      });
    } else {
      competitionService.getOne(selectedCompetition).then((competition) => {
        selectedQuestions.forEach((questionId) => {
          competition.questionIds.push(questionId);
        });
        competitionService
          .update(selectedCompetition, competition)
          .then((updatedCompetition) => {
            competitionService.getAll().then((fetchedCompetitions) => {
              setCompetitions(fetchedCompetitions);
              console.log(fetchedCompetitions);

              setSelectedCompetition('');
              setSelectedQuestions([]);
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              console.log(error.response.data.errors[0].defaultMessage);
              setNotification('Question Already Exists In The Competition');
              setTimeout(() => {
                setNotification('');
              }, 5000);
            }
            console.log(error.response.data);
            console.log(error.response.status);
          });
      });
      // Logic to add all selectedQuestions to selectedCompetition.
      console.log(
        'Adding multiple questions:',
        selectedQuestions,
        'to:',
        selectedCompetition
      );
    }
  };

  const handleSelectedCompetitionChange = (e) => {
    console.log('change ' + e.target.value);
    setSelectedCompetition(e.target.value);
  };

  const handleSelectedQuestionChange = (e) => {
    console.log('change ' + e.target.value);
    setSelectedQuestion(e.target.value);
  };

  return (
    <Container
      className="full-page-bg "
      fluid>
      <Row>
        <Col>
          <h1 className=" mt-5 px-5 text-start">
            Add Questions To Competition <br />
            <span className="fs-5 text-muted ">
              Add Questions To Competition
            </span>
          </h1>
          <div className=" ms-5 ">
            <p className="fs-5 fw-bold">
              Don't Want To Add Any More Questions?{' '}
              <Link
                to="/admin"
                className="text-decoration-none text-btn">
                <span className="lead fw-bold">Go Back</span>
              </Link>
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className=" mx-2 px-5"
          lg={5}>
          <label>Select A Competition</label>
          <DropDown
            options={competitions}
            selectedValue={selectedCompetition}
            handleChange={(e) => {
              console.log('change' + selectedCompetition);
              setSelectedCompetition(e.target.value);
            }}
            selectedCompetition={selectedCompetition}
            setSelectedCompetition={setSelectedCompetition}
            labelText={'Select A Competition'}
          />

          <div className="my-3">
            <Form.Label className="me-3">
              How Many Questions Will You Add?
            </Form.Label>
            <Form.Check
              inline
              type="radio"
              label="Single"
              value="single"
              checked={selectionMode === 'single'}
              onChange={handleModeChange}
            />
            <Form.Check
              inline
              type="radio"
              label="Multiple"
              value="multiple"
              checked={selectionMode === 'multiple'}
              onChange={handleModeChange}
            />
          </div>

          <div className="my-3">Filter Questions By: </div>
          <div className="difficulty-filter">
            <label
              htmlFor="difficultySelect"
              className="difficulty-label">
              Difficulty:
            </label>
            <select
              id="difficultySelect"
              className="w-25 form-select difficulty-select"
              value={difficultyFilter}
              onChange={handleFilterChange}>
              <option
                disabled
                default
                value="">
                Select Difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="all">All</option>
            </select>
            <label
              htmlFor="topicsSelect"
              className="topic-label">
              Topics:
            </label>
            <select
              id="topicsSelect"
              className="w-25 form-select difficulty-select"
              value={topicFilter}
              onChange={handleFilterChange}>
              <option
                disabled
                value="">
                Select Topic
              </option>
              <option value="Mechanics">Mechanics</option>
              <option value="Waves">Waves</option>
              <option value="Algebra">Algebra</option>
              <option value="Geometry">Geometry</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* Single select mode */}
          {selectionMode === 'single' && (
            <Form.Group
              controlId="singleSelect"
              className="mb-3">
              <Form.Label>Select a Question</Form.Label>
              <Form.Select
                value={selectedQuestion}
                onChange={handleSingleSelect}>
                <option
                  value=""
                  disabled>
                  -- Select One --
                </option>
                {filteredQuestions.map((q) => (
                  <option
                    key={q.id}
                    value={q.id}>
                    {q.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          {/* Multiple select mode */}
          {selectionMode === 'multiple' && (
            <div className="my-3">
              <Form.Label>Select Multiple Questions</Form.Label>
              {filteredQuestions.map((q) => (
                <Form.Check
                  key={q.title}
                  type="checkbox"
                  id={q.title}
                  label={q.title}
                  checked={selectedQuestions.includes(q.title)}
                  onChange={() => handleCheckboxChange(q.title)}
                />
              ))}
            </div>
          )}

          <Notification
            className={'alert alert-danger'}
            message={notification}
          />

          <button
            className="w-100 btn btn-primary"
            onClick={handleSubmit}>
            Add Questions
          </button>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default AddQuestionToCompetition;

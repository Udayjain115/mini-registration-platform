import React, { useEffect } from 'react';
import Form from '../components/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import questionService from '../services/questionService';
import DropDown from '../components/DropDown';
import competitionService from '../services/competitionService';
import Notification from '../components/Notification';

const EventCreation = ({
  competitions,
  setCompetitions,
  questions,
  setQuestions,
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [questionNotification, setQuestionNotification] = useState('');
  const [notification, setNotification] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [topics, setTopics] = useState(new Set());
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleFilterChange = (e) => {
    const { id, value } = e.target;

    if (id === 'difficultySelect') {
      setDifficultyFilter(value);
    }

    if (id === 'topicsSelect') {
      setTopicFilter(value);
    }
  };

  console.log(topicFilter, difficultyFilter);
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

  const navigate = useNavigate();

  const handleSelectedCompetitionChange = (e) => {
    console.log('change ' + e.target.value);
    setSelectedCompetition(e.target.value);
  };

  const handleSelectedQuestionChange = (e) => {
    console.log('change ' + e.target.value);
    setSelectedQuestion(e.target.value);
  };

  const handleLinkQuestion = () => {
    console.log('selectedCompetition', selectedCompetition);
    console.log('selectedQuestion', selectedQuestion);
    if (selectedCompetition === '' || selectedQuestion === '') {
      setNotification('Please select a competition and a question');
      setTimeout(() => {
        setNotification('');
      }, 5000);
      return;
    }

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
  };
  const handleQuestionChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'question') {
      setQuestion(value);
    }
    if (name === 'answer') {
      setAnswer(value);
    }
    if (name === 'option1') {
      setOption1(value);
    }
    if (name === 'option2') {
      setOption2(value);
    }
    if (name === 'option3') {
      setOption3(value);
    }
    if (name === 'option4') {
      setOption4(value);
    }
    if (name === 'difficulty') {
      setDifficulty(value);
    }
    setTopics((prevTopics) => {
      const updatedTopics = new Set(prevTopics);
      if (checked) {
        updatedTopics.add(value);
      } else {
        updatedTopics.delete(value);
      }
      console.log(updatedTopics);
      return updatedTopics;
    });
  };

  const onQuestionSubmit = (e) => {
    e.preventDefault();

    if (difficulty === '') {
      setQuestionNotification('Please Select A Difficulty');
      setTimeout(() => {
        setQuestionNotification('');
      }, 5000);
      return;
    }

    const newQuestion = {
      title: question,
      correctChoiceIndex: answer,
      options: [option1, option2, option3, option4],
      difficulty: difficulty,
      topics: Array.from(topics),
    };

    questionService
      .create(newQuestion)
      .then((createdQuestion) => {
        console.log(createdQuestion);
        setQuestions(questions.concat(createdQuestion));

        setQuestion('');
        setAnswer('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setSelectedCompetition('');
        setDifficulty('');
        setTopics(new Set());
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.data.message);

        if (error.response && error.response.status === 400) {
          setQuestionNotification(error.response.data.errors[0].defaultMessage);
        } else if (error.response && error.response.status === 500) {
          console.log(error.response.data.message, 'error');
          setQuestionNotification(error.response.data.message);
        }
      });

    setTimeout(() => {
      setQuestionNotification('');
    }, 5000);
  };
  const difficultyOptions = [
    { value: '', label: 'Select Difficulty', disabled: true }, // Default option
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
  ];
  const questionButtons = [
    { text: 'Create Question', handle: onQuestionSubmit },
  ];

  const topicOptions = [
    { value: 'Mechanics', label: 'Mechanics', disabled: false },
    { value: 'Waves', label: 'Waves', disabled: false },
    { value: 'Algebra', label: 'Algebra', disabled: false },
    { value: 'Geometry', label: 'Geometry', disabled: false },
  ];
  const questionFields = [
    { label: 'Question', type: 'text', name: 'question', value: question },
    {
      label: 'Answer Index ( 1 - 4 )',
      type: 'number',
      name: 'answer',
      value: answer,
    },
    { label: 'Option A', type: 'text', name: 'option1', value: option1 },
    { label: 'Option B', type: 'text', name: 'option2', value: option2 },
    { label: 'Option C', type: 'text', name: 'option3', value: option3 },
    { label: 'Option D', type: 'text', name: 'option4', value: option4 },
    {
      label: 'Difficulty',
      type: 'select',
      name: 'difficulty',
      value: difficulty,
      options: difficultyOptions,
    },
    {
      label: 'Topics',
      type: 'checkbox',
      name: 'topics',
      value: topics,
      options: topicOptions,
      required: true,
    },
  ];

  return (
    <Container
      className="full-page-bg"
      fluid>
      <Row>
        <Col lg={5}>
          <h1 className=" mt-5 px-5 text-start">
            Create Question <br />
            <span className="fs-5 text-muted ">
              Add A Question To The Question Bank
            </span>
          </h1>
        </Col>
        <Col lg={1}></Col>

        <Col lg={5}>
          <h1 className=" mt-5 text-start">
            Question Bank <br />
            <span className="fs-5 text-muted ">
              Add A Question To A Competition
            </span>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col lg={5}>
          <Form
            className="signup-form ms-5"
            message={questionNotification}
            key={question.title}
            fields={questionFields}
            buttons={questionButtons}
            competitions={competitions}
            selectedCompetition={selectedCompetition}
            setSelectedCompetition={setSelectedCompetition}
            handleChange={handleQuestionChange}
          />
        </Col>
        <Col lg={1}></Col>
        <Col lg={5}>
          <>
            <h5>
              Filter Questions By{' '}
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
            </h5>
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

            <label>Select A Question</label>
            <DropDown
              options={filteredQuestions}
              selectedValue={selectedQuestion}
              handleChange={(e) => {
                console.log('change ' + e.target.value);
                setSelectedQuestion(e.target.value);
              }}
              selectedQuestion={selectedCompetition}
              setSelectedQuestion={setSelectedCompetition}
              labelText={'Select A Question'}
            />
            <Button
              onClick={handleLinkQuestion}
              className="mt-4 btn-qb">
              Add Question To Competition
            </Button>
            <Notification
              className="alert alert-danger notification w-50 mx-auto"
              message={notification}
            />
          </>
          <Row>
            <div className=" ms-5 py-4">
              <p className="fs-5">
                Dont Want To Create A Question?{' '}
                <Link
                  to="/admin"
                  className="text-decoration-none text-btn">
                  <span className="lead fw-bold ">Go Back</span>
                </Link>
              </p>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EventCreation;

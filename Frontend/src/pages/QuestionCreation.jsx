import React from 'react';
import Form from '../components/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import questionService from '../services/questionService';
import competitionService from '../services/competitionService';

const EventCreation = ({ competitions, setCompetitions }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [questionNotification, setQuestionNotification] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');

  const navigate = useNavigate();

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
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
  };

  const onQuestionSubmit = (e) => {
    e.preventDefault();
    if (selectedCompetition === '') {
      setQuestionNotification('Please select a competition');
      setTimeout(() => {
        setQuestionNotification('');
      }, 5000);
      return;
    }

    const newQuestion = {
      title: question,
      correctChoiceIndex: answer,
      options: [option1, option2, option3, option4],
    };

    questionService
      .create(newQuestion)
      .then((createdQuestion) => {
        console.log(createdQuestion);
        questionService.getAll().then((fetchedQuestions) => {
          competitionService
            .getOne(selectedCompetition)
            .then((currentCompetition) => {
              currentCompetition.questionIds.push(question);
              competitionService
                .update(selectedCompetition, currentCompetition)
                .then((updatedCompetition) => {
                  competitionService.getAll().then((fetchedCompetitions) => {
                    setCompetitions(fetchedCompetitions);

                    console.log(fetchedCompetitions);
                  });
                })
                .catch((error) => {
                  console.log(error.response.data);
                  console.log(error.response.status);
                });
            });
          setQuestions(fetchedQuestions);
        });
        setQuestion('');
        setAnswer('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setSelectedCompetition('');
        navigate('/admin');
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

  const questionButtons = [
    { text: 'Create Question', handle: onQuestionSubmit },
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
  ];

  return (
    <Container
      className="full-page-bg"
      fluid>
      <Row>
        <Col>
          <h1 className=" mt-5 px-5 text-start">
            Create Question <br />
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
            dropdown={true}
            competitions={competitions}
            selectedCompetition={selectedCompetition}
            setSelectedCompetition={setSelectedCompetition}
            handleChange={handleQuestionChange}
            onSubmit
          />
        </Col>
      </Row>
      <Row>
        <div className=" ms-5 py-4">
          <p fs-5>
            Dont Want To Create A Question?{' '}
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

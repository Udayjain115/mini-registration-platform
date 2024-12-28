import React from 'react';
import Event from '../components/event';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import eventService from '../services/eventService';
import Notification from '../components/Notification';
import Form from '../components/Form';
import competitionService from '../services/competitionService';
import User from '../components/User';
import Competition from '../components/Competition';
import questionService from '../services/questionService';
const admin = ({
  events,
  users,
  setEvents,
  isLoggedIn,
  currentUser,
  setCurrentUser,
  competitions,
  setCompetitions,
  questions,
  setQuestions,
}) => {
  const [event, setEvent] = useState('');
  const [competition, setCompetition] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const [notAllowed, setNotAllowed] = useState(true);
  const [notification, setNotification] = useState('');
  const [competitionNotification, setCompetitionNotification] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [questionNotification, setQuestionNotification] = useState('');
  useEffect(() => {
    eventService.getAll().then((initialEvents) => {
      setEvents(initialEvents);
    });
  }, []);

  useEffect(() => {
    competitionService.getAll().then((initialCompetitions) => {
      setCompetitions(initialCompetitions);
    });
  }, [questions]);

  useEffect(() => {
    console.log(competitions);
  }, [competitions]);

  useEffect(() => {
    if (currentUser === null || currentUser.email !== 'admin') {
      console.log(currentUser);

      setNotAllowed(true);

      navigate('/');
    } else {
      setNotAllowed(false);
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/');
  };

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
  const handleCompeititionChange = (e) => {
    setCompetition(e.target.value);
    console.log(e.target.value);
  };

  const onCompetitionSubmit = (e) => {
    e.preventDefault();

    const newCompetition = {
      title: competition,
    };

    competitionService
      .create(newCompetition)
      .then((createdCompetition) => {
        competitionService.getAll().then((fetchedCompetitions) => {
          setCompetitions(fetchedCompetitions);
        });
        setCompetition('');
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response && error.response.status === 400) {
          setCompetitionNotification('Please fill in all fields');
        } else if (error.response && error.response.status === 500) {
          setCompetitionNotification('Competition Already Exists');
        }
      });
    setTimeout(() => {
      setCompetitionNotification('');
    }, 5000);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name: event,
      description: description,
      date: date,
    };

    eventService
      .create(newEvent)
      .then((createdEvent) => {
        eventService.getAll().then((fetchedEvents) => {
          setEvents(fetchedEvents);
        });
        setEvent('');
        setDescription('');
        setDate('');
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        if (error.response && error.response.status === 400) {
          setNotification('Please fill in all fields');
        } else if (error.response && error.response.status === 500) {
          setNotification('Event Already Exists');
        }
      });
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };
  const buttons = [{ text: 'Create Event', handle: handleSubmit }];
  const fields = [
    { label: 'Event Name', type: 'text', name: 'event', value: event },
    {
      label: 'Event Description',
      type: 'text',
      name: 'description',
      value: description,
    },
    { label: 'Event Date', type: 'date', name: 'date', value: date },
  ];

  const competitionFields = [
    {
      label: 'Competition Name',
      type: 'text',
      name: 'competition',
      value: competition,
    },
  ];

  const competitionButtons = [
    { text: 'Create Competition', handle: onCompetitionSubmit },
  ];

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
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    if (name === 'event') {
      setEvent(value);
    }
    if (name === 'description') setDescription(value);
    if (name === 'date') setDate(value);
  };
  if (notAllowed) {
    return null;
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <button
              className="btn btn-primary btn-lg ms-auto mt-2 mb-2 d-block"
              onClick={handleLogout}>
              Logout
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <Form
              className="signup-form ms-5"
              message={notification}
              handleSubmit={handleSubmit}
              handleChange={handleEventChange}
              fields={fields}
              buttons={buttons}
            />
          </Col>
          <Col lg={2}>
            <Form
              className="signup-form ms-5"
              message={competitionNotification}
              fields={competitionFields}
              buttons={competitionButtons}
              handleChange={handleCompeititionChange}
              onSubmit={onCompetitionSubmit}
              key={competition.title}
            />
          </Col>
          <Col lg={8}>
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
          <Col lg={6}>
            {' '}
            <div className="events-container ">
              {events.map((event) => (
                <Event
                  users={users}
                  key={event.id}
                  event={event}
                  isLoggedIn={false}
                  currentUser={currentUser}
                />
              ))}
            </div>
          </Col>
          <Col lg={6}>
            <div className="events-container">
              {competitions.map((competition) => (
                <Competition
                  isAdmin={true}
                  events={events}
                  key={competition.id}
                  competition={competition}
                  setEvents={setEvents}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default admin;

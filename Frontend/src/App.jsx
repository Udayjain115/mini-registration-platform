import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Admin from './pages/admin';
import eventService from './services/eventService';
import useCurrentUser from './hooks/useCurrentUser';
import userService from './services/userService';
import competitionService from './services/competitionService';
import QuizPage from './pages/QuizPage';
import EventCreation from './pages/EventCreation';
import Competition from './components/Competition';
import CompetitionCreation from './pages/CompetitionCreation';
import QuestionCreation from './pages/QuestionCreation';
import questionService from './services/questionService';
import Results from './pages/Results';

const App = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentUser, setCurrentUser] = useCurrentUser();

  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  useEffect(() => {
    eventService.getAll().then((initialEvents) => setEvents(initialEvents));

    userService.getAll().then((initialUsers) => setUsers(initialUsers));
    competitionService
      .getAll()
      .then((initialCompetitions) => setCompetitions(initialCompetitions));

    questionService
      .getAll()
      .then((initialQuestions) => setQuestions(initialQuestions));
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser]);
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={
            <SignUp
              users={users}
              setUsers={setUsers}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/results"
          element={<Results currentUser={currentUser} />}
        />
        <Route
          path="/eventCreation"
          element={<EventCreation />}
        />
        <Route
          path="/competitionCreation"
          element={<CompetitionCreation />}
        />
        <Route
          path="/questionCreation"
          element={
            <QuestionCreation
              competitions={competitions}
              setCompetitions={setCompetitions}
              questions={questions}
              setQuestions={setQuestions}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LogIn
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              users={users}
              setUsers={setUsers}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              competitions={competitions}
              setCompetitions={setCompetitions}
              events={events}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              users={users}
              setEvents={setEvents}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/"
          element={
            <LandingPage
              events={events}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
              users={users}
              setUsers={setUsers}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route
          path="/competition"
          element={
            <QuizPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

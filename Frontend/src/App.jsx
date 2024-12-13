import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Admin from './pages/admin';
import eventService from './services/eventService';
import useCurrentUser from './hooks/useCurrentUser';
import userService from './services/userService';

const App = () => {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useCurrentUser();

  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  useEffect(() => {
    eventService.getAll().then((initialEvents) => setEvents(initialEvents));

    userService.getAll().then((initialUsers) => setUsers(initialUsers));
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
      </Routes>
    </Router>
  );
};

export default App;
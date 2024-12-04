import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Admin from './pages/admin';

const App = () => {
  const [events, setEvents] = useState([
    { name: 'Event 1', id: 1 },
    { name: 'Event 2', id: 2 },
    { name: 'Event 3', id: 3 },
    { name: 'Event 4', id: 4 },
    { name: 'Event 5', id: 5 },
    { name: 'Event 6', id: 6 },
    { name: 'Event 7', id: 7 },
    { name: 'Event 8', id: 8 },
    { name: 'Event 9', id: 9 },
    { name: 'Event 10', id: 10 },
  ]);
  const [users, setUsers] = useState([
    { name: 'Admin', email: 'Admin', password: 'Admin' },
    { name: 'User1', email: 'User1', password: 'User1' },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={
            <SignUp
              users={users}
              setUsers={setUsers}
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
              setCurrentUser={setCurrentUser}
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

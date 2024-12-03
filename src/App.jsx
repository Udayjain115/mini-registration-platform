import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Admin from './pages/admin';

const App = ({ events, users }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<SignUp users={users} />}
        />
        <Route
          path="/login"
          element={
            <LogIn
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              users={users}
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
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

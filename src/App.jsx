import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import LogIn from './pages/LogIn';

const App = ({ events }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LogIn />}
        />
        <Route
          path="/"
          element={<LandingPage events={events} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

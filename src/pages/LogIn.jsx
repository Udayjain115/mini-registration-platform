import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/');
  };
  return (
    <div>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;
